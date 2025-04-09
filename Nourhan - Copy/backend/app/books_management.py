from flask import Blueprint, request, jsonify
import sys
import os

# Add parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from models import db
from models.books import Book
from datetime import datetime

book_bp = Blueprint("book_bp", __name__, url_prefix="/books")

# CREATE a book
@book_bp.route("/", methods=["POST"])
def add_book():
    data = request.json
    try:
        book = Book(
            title=data["title"],
            author=data["author"],
            publication_date=datetime.strptime(data["publication_date"], "%Y-%m-%d") if data.get("publication_date") else None,
            total_copies=data.get("total_copies", 1),
            available_copies=data.get("total_copies", 1),
            status="available"
        )
        db.session.add(book)
        db.session.commit()
        return jsonify({"message": "Book added successfully", "book": book.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# READ all books
@book_bp.route("/", methods=["GET"])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books]), 200

# UPDATE a book
@book_bp.route("/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    data = request.json
    print("Received PUT data:", data) 
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404

    try:
        book.title = data.get("title", book.title)
        book.author = data.get("author", book.author)
        if data.get("publication_date"):
            book.publication_date = datetime.strptime(data["publication_date"], "%Y-%m-%d")
        if "total_copies" in data:
            new_total = int(data["total_copies"])  # 👈 convert string to int
            diff = new_total - book.total_copies
            book.total_copies = new_total
            book.available_copies += diff

        db.session.commit()
        return jsonify({"message": "Book updated", "book": book.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# DELETE a book
@book_bp.route("/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404
    try:
        db.session.delete(book)
        db.session.commit()
        return jsonify({"message": "Book deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
# GET book details by ID
@book_bp.route("/<int:book_id>", methods=["GET"])
def get_book_by_id(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404
    return jsonify(book.to_dict()), 200


# BORROW books
@book_bp.route("/<int:book_id>/borrow", methods=["POST"])
def borrow_book(book_id):
    data = request.json
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404

    try:
        quantity = int(data.get("quantity", 1))
        if quantity <= 0 or quantity > book.available_copies:
            return jsonify({"error": "Invalid quantity to borrow"}), 400

        book.available_copies -= quantity
        db.session.commit()
        return jsonify({"message": f"Borrowed {quantity} copy(ies)", "book": book.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# RETURN books
@book_bp.route("/<int:book_id>/return", methods=["POST"])
def return_book(book_id):
    data = request.json
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404

    try:
        quantity = int(data.get("quantity", 1))
        borrowed = book.total_copies - book.available_copies
        if quantity <= 0 or quantity > borrowed:
            return jsonify({"error": "Invalid quantity to return"}), 400

        book.available_copies += quantity
        db.session.commit()
        return jsonify({"message": f"Returned {quantity} copy(ies)", "book": book.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@book_bp.route("/search", methods=["GET"])
def search_books():
    query = request.args.get("q", "")
    if not query:
        return jsonify([])

    books = Book.query.filter(
        db.or_(
            Book.title.ilike(f"%{query}%"),
            Book.author.ilike(f"%{query}%")
        )
    ).all()
    return jsonify([book.to_dict() for book in books]), 200
