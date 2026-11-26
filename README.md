# 🏫 school_db — Full School Database Management System

A full-stack, enterprise-grade School Database Management System built using **Node.js**, **Express.js**, and **MongoDB (Mongoose)**, featuring an interactive web dashboard for **school_db** (Greenfield High School).

![school_db Dashboard](https://img.shields.io/badge/Node.js-v20+-green.svg)
![Express.js](https://img.shields.io/badge/Express-4.21-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208-brightgreen.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

---

## 🌟 Key Features

- **School Overview Dashboard (Faithfully Aligned with school_db UI)**:
  - **5 Top KPI Cards**: Total Students (1,284), Attendance Rate (96.4%), Fee Collection (84%), Total Staff (86 / 48 online), Active Classes (134).
  - **Attendance Matrix Grid**: Weekly class breakdown (JSS 1A through SSS 3A) with visual status indicators (Present, Late, Absent, No Data).
  - **school_db AI Assistant (BETA)**: Automated operational intelligence highlighting at-risk students, financial variances, and upcoming exams with an interactive **AI Executive Report Generator**.
  - **Fee Collection Summary**: Donut progress, numerical breakdown (Collected: ₦12.4M, Expected: ₦14.8M, Balance: ₦2.4M), and 4-week bar charts.
  - **Student Performance Overview**: Multi-segmented donut chart with grade distribution (Excellent 28%, Good 32%, Average 25%, Below Average 10%, Poor 5%).
  - **Upcoming Events & Calendar**: Date badges for Mock Exams, PTA General Meetings, and Term Openings.
  - **Staff Overview**: Categorized breakdown of Teaching Faculty (67%), Non-Teaching Staff (23%), and Support Staff (10%).

- **Complete Relational & Document-Oriented Database Schemas**:
  - `User`: JWT authentication, encrypted passwords (`bcryptjs`), role-based access control (`Super Admin`, `Admin`, `Teacher`, `Staff`, `Student`, `Parent`).
  - `Student`: Admissions, bio-data, guardian contacts, class arm, blood group, performance rating, fee standing, and attendance history.
  - `Staff`: Faculty roster, qualifications, departments, assigned subjects, and online active status.
  - `ClassRoom`: Grade levels, classroom capacities, class teachers, and enrollment ratios.
  - `Attendance`: Daily attendance register with per-student roll checks, presence rates, and late/absence tracking.
  - `Fee`: Tuition invoicing, partial/full payments, balance calculation, and payment methods.
  - `Exam`: Assessment schedules, target classes, subjects, and exam status.
  - `LibraryBook`: Library catalog, copy availability, categories, and shelf locations.
  - `Event`: School-wide circulars and announcements with audience filtering (Students, Teachers, Parents).

- **Interactive Web Management Interface**:
  - **Examinations**: View term schedules, class assignments, subject lists, and assessment status.
  - **Library Catalogue**: View books by category, shelf location, and available-copy count.
  - Live search (`⌘ K` / `Ctrl+K`) across students, staff, and classes.
  - Full CRUD operations via modal dialogs: Enroll New Student, Mark Attendance, Record Fee Payment, and Post Announcements.
  - Zero-config resilience: Automatically connects to local MongoDB or MongoDB Atlas, with automatic seeding and an in-memory fallback.

---

## 🏗️ Project Architecture

```
School database/
├── .env                         # Environment variables (PORT, MONGODB_URI, School details)
├── .env.example                 # Environment template
├── package.json                 # Dependencies and npm run scripts
├── server.js                    # Main Express application entrypoint
├── README.md                    # Project documentation
├── src/
│   ├── config/
│   │   └── db.js                # MongoDB connection handler & auto-seeder
│   ├── models/
│   │   ├── Student.js           # Student Mongoose Schema
│   │   ├── Staff.js             # Staff / Faculty Schema
│   │   ├── ClassRoom.js         # Classroom / Section Schema
│   │   ├── Attendance.js        # Attendance Register Schema
│   │   ├── Fee.js               # Finance & Invoice Schema
│   │   ├── Exam.js              # Examination Schema
│   │   ├── LibraryBook.js       # Library catalog Schema
│   │   └── Event.js             # Notice & Event Schema
│   ├── controllers/
│   │   ├── dashboardController.js
│   │   ├── studentController.js
│   │   ├── staffController.js
│   │   ├── classController.js
│   │   ├── attendanceController.js
│   │   ├── feeController.js
│   │   ├── eventController.js
│   │   ├── examController.js
│   │   └── libraryController.js
│   ├── routes/
│   │   ├── dashboardRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── staffRoutes.js
│   │   ├── classRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── feeRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── examRoutes.js
│   │   └── libraryRoutes.js
│   ├── seeds/
│   │   ├── seedData.js          # Realistic seed datasets
│   │   └── seedRunner.js        # Standalone CLI seeder script (`npm run seed`)
│   └── utils/
│       └── memoryStore.js       # Fallback store for instant zero-downtime demoing
└── public/
    ├── index.html               # school_db Frontend UI
    ├── css/
    │   └── styles.css           # Modern layout styles & typography
    └── js/
        └── app.js               # Client controllers, API integration, and charts
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ installed on your system.
- **MongoDB** (Local Community Server running on `mongodb://127.0.0.1:27017` OR a free cloud cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)).

### 2. Installation
Open your terminal in this directory and install dependencies:
```bash
npm install
```

### 3. Environment Configuration
The project is pre-configured with a `.env` file. You can modify your database URL or school settings as needed:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/school_management
SCHOOL_NAME=Greenfield High School
ACADEMIC_SESSION=2024/2025 Academic Session
CURRENT_TERM=First Term
```

> **Using MongoDB Atlas (Cloud)?**
> Replace `MONGODB_URI` with your connection string:
> `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/school_management?retryWrites=true&w=majority`

### 4. Seed the Database
Populate the database with sample classes, teachers, students, invoices, events, examinations, and library books:
```bash
npm run seed
```

The Examination and Library sections are available in the dashboard. Their read-only data APIs are `GET /api/exams` and `GET /api/library/books`.
*(Note: If you run the server for the first time on an empty database, it will automatically auto-seed!)*

### 5. Launch the Server
```bash
npm start
```
Or for live-reload development mode:
```bash
npm run dev
```

### 6. Open in Browser
Visit **[http://localhost:5000](http://localhost:5000)** to experience the dashboard!

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new account (Sign up with password hashing) |
| `POST` | `/api/auth/login` | Authenticate user & return signed JWT token (Sign in) |
| `GET` | `/api/auth/me` | Get authenticated user profile (Requires `Bearer <token>`) |
| `GET` | `/api/health` | System health check and database connection status |
| `GET` | `/api/dashboard` | Dashboard KPIs, attendance matrix, AI insights, and summary charts |
| `GET` | `/api/students` | Get all students (Supports `?search=...`, `?className=...`, `?status=...`) |
| `GET` | `/api/students/:id` | Get individual student profile by ID |
| `POST` | `/api/students` | Enroll a new student |
| `PUT` | `/api/students/:id` | Update student profile details |
| `DELETE` | `/api/students/:id` | Delete / remove a student record |
| `GET` | `/api/staff` | List all teaching and non-teaching faculty |
| `POST` | `/api/staff` | Add a new staff member |
| `GET` | `/api/classes` | List classrooms, enrolled counts, and teachers |
| `POST` | `/api/classes` | Create a new classroom |
| `GET` | `/api/attendance/overview`| Fetch weekly attendance breakdown |
| `POST` | `/api/attendance/mark` | Record daily attendance counts for a class |
| `GET` | `/api/fees` | Get all tuition invoices and fee balances |
| `POST` | `/api/fees` | Create an invoice |
| `POST` | `/api/fees/pay` | Record a payment against an invoice |
| `GET` | `/api/events` | List school announcements and calendar events |
| `POST` | `/api/events` | Publish a new school announcement |

---

## 🛡️ License
Open source and available under the [ISC License](LICENSE).
