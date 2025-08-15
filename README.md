# Store Rating Web App

A full-stack web application that enables users to rate stores, with role-based dashboards for Admins, Normal Users, and Store Owners.  
Built with **ExpressJS (Node.js)**, **MySQL**, and **React (Vite)**.

---

## **Tech Stack**

- **Backend:** ExpressJS + Sequelize ORM
- **Database:** MySQL (configured to work with XAMPP)
- **Frontend:** React & Vite
- **Authentication:** JWT (role-based)

---

## **Getting Started**

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/Piyush9477/Store-Rating-WebApp
cd Store-Rating-WebApp
```

---

### 2️⃣ **Backend Setup**

#### 2.1 Install Dependencies
```bash
cd backend
npm install
```

#### 2.2 Create a `.env` File
Create a `backend/.env` file and fill in these details:
```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=store_rating_app
JWT_SECRET=your_very_secret_key
PORT=5000
```
> - Replace `DB_USER`, `DB_PASS`, and `DB_NAME` as per your XAMPP MySQL setup.
> - Make sure MySQL is running (start via XAMPP Control Panel).

#### 2.3 Create the Database
Login to **phpMyAdmin** (via XAMPP) or run:
```bash
CREATE DATABASE store_rating_app;
```

#### 2.4 Run the Backend Server
```bash
npm run dev
```
> The server runs at `http://localhost:5000`

---

### 3️⃣ **Frontend Setup**

#### 3.1 Install Dependencies
```bash
cd ../frontend
npm install
```

#### 3.3 Start the Frontend Dev Server
```bash
npm run dev
```
> Default: `http://localhost:5173`

---

### 4️⃣ **Access the App**

- Open your browser and go to: [http://localhost:5173]
- Register, login, and explore the Admin, User, and Owner dashboards.

---

### 5️⃣ **Default Roles**

- You can create new users via the registration form or as admin.
- Roles: `admin`, `user` (normal), and `owner` (store owner).
- After registering as a normal user, set role to `admin` or `owner` in DB directly if you need a superuser at start.