# 📚 Book Management System

A full-stack web application built with **Flask** (backend) and **React.js** (frontend) to manage a collection of books. Users can add, edit, delete, borrow, return, and search for books.

---

## ⚙️ Backend Setup (Flask + MySQL)

### 1. Create a `.env` file

Inside the `backend/` folder, create a `.env` file and add your MySQL database credentials:

```
MYSQL_USER=root
MYSQL_HOST=localhost
MYSQL_DB=book_keeping_system
```

> 🔐 Never push this file to GitHub.

### 2. Create a virtual environment

```bash
cd backend
py -m venv venv
venv\Scripts\activate  # On Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the backend server

```bash
cd app
python app.py
```

By default, the backend runs at: [http://localhost:5000](http://localhost:5000)

---

## 💻 Frontend Setup (React.js)

### 1. Navigate to the frontend directory

```bash
cd frontend/frontend
```

### 2. Install dependencies

```bash
npm install
npm install axios
```

### 3. Start the frontend server

```bash
npm start
```

By default, the frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 🔍 Features

- Add, edit, and delete books
- Borrow and return copies
- Search by title or author
- View book details
- Clean UI with dynamic state handling

---

## 🛠 Tech Stack

- **Backend:** Flask, SQLAlchemy, MySQL
- **Frontend:** React.js, Axios
- **Other:** .env config, RESTful API

---

## 📂 Project Structure

```
backend/
  ├── app/
  │   └── app.py
  │   └── books_management.py
  ├── models/
  ├── requirements.txt
  └── .env

frontend/
  └── frontend/
      ├── src/
      ├── public/
      └── package.json
```

---

## ✅ Requirements

- Python 3.8+
- Node.js & npm
- MySQL server running locally

---

Feel free to contribute or open issues!
