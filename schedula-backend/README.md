# 🏥 Schedula Backend

A healthcare appointment scheduling platform built using NestJS and PostgreSQL that helps patients discover doctors, book appointments, manage schedules, and receive timely notifications.

---

# Project Overview

Schedula is designed to simplify the appointment booking process between patients and healthcare professionals.

Traditional appointment scheduling often involves phone calls, manual records, and long waiting times. These processes can lead to scheduling conflicts, communication gaps, and poor user experience.

The goal of Schedula is to provide a centralized platform where patients can easily find doctors, check their availability, schedule appointments, and stay informed through automated notifications. At the same time, doctors can efficiently manage their schedules and appointment slots.

This repository contains the initial backend architecture, documentation, and database design created as part of the Backend Internship Program.

---

# Business Problem

Healthcare appointment management is often fragmented and difficult to scale.

Common challenges include:

* Manual appointment booking processes
* Double-booking of consultation slots
* Lack of real-time availability tracking
* Poor communication between doctors and patients
* Difficulty managing cancellations and rescheduling

Schedula aims to solve these challenges through a structured and scalable scheduling platform.

---

# User Roles

## Patient

Patients can:

* Create and manage accounts
* Browse doctors
* View doctor profiles and specializations
* Check available appointment slots
* Book appointments
* Reschedule appointments
* Cancel appointments
* Receive reminders and notifications

---

## Doctor

Doctors can:

* Register on the platform
* Complete profile setup
* Manage availability slots
* View scheduled appointments
* Organize consultation schedules
* Receive appointment notifications

---

## Future Scope: Admin

Future versions of the platform may include an administrative role responsible for:

* User management
* Platform monitoring
* System reporting
* Operational oversight

---

# Technology Stack

| Component         | Technology           |
| ----------------- | -------------------- |
| Backend Framework | NestJS               |
| Language          | TypeScript           |
| Database          | PostgreSQL           |
| API Testing       | Postman / Hoppscotch |
| Version Control   | Git & GitHub         |

---

# Backend Architecture

The backend follows a modular architecture to improve scalability and maintainability.

Modules identified during system analysis:

* User Module
* Doctor Module
* Patient Module
* Availability Module
* Appointment Module
* Notification Module

This structure allows features to evolve independently while maintaining clean separation of responsibilities.

---

# Database Design

The database was designed after analyzing the complete workflow provided in the wireframe.

Core entities include:

* User
* Doctor
* Patient
* Availability
* Appointment
* Notification

Key design decisions:

### Centralized User Management

Authentication and authorization are handled through a common User entity to avoid duplication of login-related information.

### Separate Availability Management

Doctor availability is maintained independently from appointments. This prevents scheduling conflicts and simplifies rescheduling workflows.

### Notification System

Notifications are linked directly to users, making it easier to support reminders, updates, and future communication features.

---

# Documentation

The project includes supporting documentation to explain system design decisions.

```text
docs/
├── project-overview.md
├── entity-analysis.md
└── ER-DIAGRAM.png
```

### Project Overview

High-level understanding of the healthcare scheduling system and user workflows.

### Entity Analysis

Detailed breakdown of entities, attributes, and relationships identified from the wireframe.

### ER Diagram

Visual representation of the database schema and entity relationships.

---

# Project Structure

```text
schedula-backend/

├── docs/
│   ├── project-overview.md
│   ├── entity-analysis.md
│   └── ER-DIAGRAM.png
│
├── src/
│   ├── users/
│   ├── doctors/
│   ├── patients/
│   ├── appointments/
│   ├── availability/
│   └── notifications/
│
├── test/
│
├── package.json
└── README.md
```

---

# Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run start:dev
```

### Application URL

```text
http://localhost:3000
```

If the setup is successful, the NestJS application will start locally without errors.

---

# Deliverables Completed

* NestJS project setup
* Local application execution
* Workflow analysis
* Entity identification
* Entity relationship design
* ER Diagram creation
* GitHub repository setup
* Feature branch workflow
* Pull Request submission

---

# Key Learnings

This assignment helped strengthen my understanding of:

* NestJS fundamentals
* Backend project organization
* Database design principles
* Entity relationship modeling
* Git and GitHub workflows
* Translating business requirements into technical architecture

Most importantly, it highlighted the importance of understanding a product before writing code.

---

# Author

**Pranav Dogra**

Backend Internship Program – Day 1 Submission
