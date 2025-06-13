# 🧹 CleanStreet

**CleanStreet** is a community-driven complaint management platform built to help citizens report civic issues such as garbage piles, potholes, and other street-related problems. The platform connects users with the municipality, ensuring timely action and improved urban cleanliness.

## 🔧 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Spring Boot (Java), Spring Security, JPA/Hibernate
- **Database**: MySQL
- **Authentication**: JWT-based role-based login (Admin/User)

## 🚀 Features

### 👤 User Features
- Register/Login to the portal
- Submit complaints with location, image, and description
- View and track complaint status (Open, In Progress, Resolved)
- Edit complaint details only if status is **Open**
- Delete complaint if **Open**

### 🛠️ Admin Features
- View all complaints
- Update status:
  - `OPEN → IN_PROGRESS`
  - `IN_PROGRESS → RESOLVED`
- Delete complaints only if status is **RESOLVED**

### 📱 Responsive Design
- Clean and mobile-friendly UI with Tailwind CSS
- Alerts and error handling for smoother UX

## 📂 Project Structure

client/ → React frontend
└── components/
└── pages/
└── context/

server/ → Spring Boot backend
└── controller/
└── service/
└── model/
└── repository/