from . import db
from datetime import datetime

class BorrowedRecord(db.Model):
    __tablename__ = "borrowed_records"

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    borrower_name = db.Column(db.String(100), nullable=True)  # for anonymous users

    borrowed_at = db.Column(db.DateTime, default=datetime.utcnow)
    returned_at = db.Column(db.DateTime, nullable=True)

    user = db.relationship("User", back_populates="borrowed_records")
    book = db.relationship("Book", back_populates="borrowed_records")

    def to_dict(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "user_id": self.user_id,
            "borrower_name": self.borrower_name,
            "borrowed_at": self.borrowed_at.isoformat(),
            "returned_at": self.returned_at.isoformat() if self.returned_at else None
        }
