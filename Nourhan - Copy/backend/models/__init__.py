from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .books import Book
from .borrowed_records import BorrowedRecord
