from . import db

class Book(db.Model):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    publication_date = db.Column(db.Date, nullable=True)
    status = db.Column(db.Enum("available", "borrowed", name="book_status"), default="available", nullable=False)

    total_copies = db.Column(db.Integer, nullable=False, default=1)
    available_copies = db.Column(db.Integer, nullable=False, default=1)

    borrowed_records = db.relationship("BorrowedRecord", back_populates="book")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "publication_date": self.publication_date.isoformat() if self.publication_date else None,
            "status": self.status,
            "total_copies": self.total_copies,
            "available_copies": self.available_copies,
            "borrowed_copies": self.total_copies - self.available_copies
        }
