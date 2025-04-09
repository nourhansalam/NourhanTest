from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
import sys

# Add backend/ (the parent folder of this file) to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Import database and models
from models import db
from models.user import User
from models.books import Book
from models.borrowed_records import BorrowedRecord
from books_management import book_bp

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration using environment variables
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f'mysql+pymysql://{os.getenv("MYSQL_USER")}@'
    f'{os.getenv("MYSQL_HOST")}/{os.getenv("MYSQL_DB")}'
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize database
db.init_app(app)


@app.route("/")
def home():
    return {"message": " Book Management System is running"}

app.register_blueprint(book_bp)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  
    app.run(debug=True, port=5000)
