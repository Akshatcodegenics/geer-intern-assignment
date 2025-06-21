# 🛒 geer-intern-assignment – E-Commerce Website for the New Generation

This repository contains the submission for the **Geer Internship Assignment** – a modern, responsive, full-stack e-commerce website inspired by [Geer.in](https://geer.in).

## 📋 Assignment Overview

We were tasked with building a simple full-stack e-commerce application using **Next.js** for the frontend and either **Next.js API routes** or **Node.js/Express** for the backend.

---

## 📂 Folder Structure

geer-intern-assignment/
├── frontend/ # Next.js app (Product listing page)
└── backend/ # (Optional) Express API server

yaml
Copy
Edit

---

## 🚀 How to Run the Project

### 1️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
Runs the Next.js app at http://localhost:3000

2️⃣ Backend Setup (If using Express)
bash
Copy
Edit
cd backend
npm install
npm run start
Runs the Express server at http://localhost:5000

API Base: /api/products

If you're using Next.js API Routes instead, the backend is integrated and no separate server setup is needed.

🧠 Tech Stack Used
Area	Technology
Frontend	Next.js (React)
Styling	Tailwind CSS / CSS Modules
Backend	Next.js API Routes or Node.js + Express
Data	In-memory JSON (No DB)

✅ Assignment Tasks
📌 Task 1 – Frontend (Next.js)
✅ Created /products route

✅ Displays product list: image, name, price

✅ Fully responsive (mobile-friendly)

✅ Fetches data from backend API

🌟 Bonus Features (Optional)
🔍 Search/filter functionality

📄 Dynamic Product Page: /products/[id] with details

📌 Task 2 – Backend (API)
Option A – Next.js API Routes
GET /api/products – Returns all products

POST /api/products – Adds new product

DELETE /api/products/:id – Deletes product by ID

OR
Option B – Node.js + Express
Same endpoints created on Express server

Products stored in an in-memory array

⚙️ API Endpoints
Method	Endpoint	Description
GET	/api/products	Get all products
POST	/api/products	Add a new product
DELETE	/api/products/:id	Delete product by ID

📝 Assumptions & Notes
Products are stored in-memory (not persisted to DB)

Product IDs are generated using uuid (or array index)

All images are assumed to be hosted externally or locally in public/

Search feature (if implemented) is case-insensitive and filters by name or category

🤝 Submission
✅ GitHub Repo: https://github.com/yourusername/geer-intern-assignment

✅ Folder structure follows guidelines

✅ This README.md explains how to run the project

📩 Contact
If you have any questions or suggestions, feel free to reach out:

Your Name
GitHub • LinkedIn • Email: your.email@example.com

Thanks for reviewing my assignment. Looking forward to contributing to the Geer team! 🚀

yaml
Copy
Edit

---

Would you like a basic version of the code and folder setup too?
