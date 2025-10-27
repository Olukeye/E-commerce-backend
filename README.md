# 🛒 E-Commerce Backend

A fully functional backend API for an E-Commerce platform, built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
This project powers core e-commerce features such as authentication, product management, order handling, and role-based access control.

---

## 🚀 Features

- 🔐 User authentication (JWT-based)
- 👤 Role-based authorization (Admin & User)
- 🛍️ Product CRUD operations
- 🧾 Category management
- 📦 Order creation and management
- 📧 Email notifications (Mailer utility)
- 🧠 Data validation
- 🧱 Modular and scalable folder structure
- 🌍 Ready for deployment (Procfile included)

---

## 🧰 Tech Stack

- **Backend Framework:** Node.js + Express  
- **Database:** MongoDB (with Mongoose ORM)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Validation:** Express Validator / Custom middleware  
- **Mailing:** NodeMailer  
- **Environment Management:** dotenv  
- **Deployment:** Render / Heroku  

---

## ⚙️ Getting Started

### Clone the repository
```bash
git clone https://github.com/Olukeye/E-commerce-backend.git
cd E-commerce-backend

npm install
# or
yarn install
---

### Environment variable keys
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=smtp.yourmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password


npm run dev


## Project structure 
### Clone the repository
E-commerce-backend/
│
├── controller/         # Route controllers
├── model/              # Mongoose models (User, Product, Order, etc.)
├── routes/             # API routes
├── validator/          # Request validators
├── mailer.js           # Email utility
├── server.js           # Entry point
├── Procfile            # Deployment config
├── package.json
├── .env.example        # Example environment variables
└── README.md



