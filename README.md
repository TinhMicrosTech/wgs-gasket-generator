# Backend Setup

## 1. Cài đặt package
```bash
npm install
```

## 2. Tạo MySQL Database
```sql
CREATE DATABASE IF NOT EXISTS gasket_app;
USE gasket_app;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS gaskets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  params TEXT,
  created_at DATETIME
);
```

## 3. Khởi động backend
```bash
npm start
```