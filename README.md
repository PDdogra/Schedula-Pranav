# Schedula-Pranav



\# Schedula Backend



\## About the Project



Schedula is a healthcare appointment scheduling platform that aims to make the appointment booking process simpler and more organized for both patients and doctors.



In many healthcare systems, appointment scheduling is still handled manually through phone calls or physical visits. This often leads to scheduling conflicts, communication delays, and difficulty managing appointments. The goal of Schedula is to provide a centralized platform where patients can easily discover doctors, check availability, schedule appointments, and receive important updates regarding their consultations.



From a doctor's perspective, the platform helps manage availability, organize appointments, and improve communication with patients.



This repository contains the initial backend setup, system analysis, and database design completed as part of the Backend Internship Program Day 1 assignment.



\---



\## My Understanding of the System



After reviewing the provided wireframe, I understood that the platform revolves around two primary users:



\### Patient



A patient should be able to:



\* Create an account and log in securely

\* Browse available doctors

\* View doctor information and specialization

\* Check available consultation slots

\* Book appointments

\* Reschedule appointments when required

\* Cancel appointments if necessary

\* Receive notifications and appointment reminders



\### Doctor



A doctor should be able to:



\* Register on the platform

\* Create and manage a professional profile

\* Define available consultation timings

\* View upcoming appointments

\* Manage appointment schedules

\* Receive notifications regarding bookings and updates



\### Admin (Future Scope)



Although not required for the current assignment, an administrator could later manage platform users, monitor activity, and oversee system operations.



\---



\## Objectives of this Assignment



The purpose of this assignment was not only to create a NestJS application but also to understand the overall product and think about how the backend should be structured before implementation.



The focus areas were:



\* Understanding the healthcare scheduling workflow

\* Identifying important business entities

\* Designing relationships between entities

\* Setting up a scalable backend project structure

\* Following a professional Git and GitHub workflow



\---



\## Technology Stack



The following technologies were used for this assignment:



\### Backend Framework



\* NestJS



\### Programming Language



\* TypeScript



\### Database



\* PostgreSQL



\### API Testing



\* Postman / Hoppscotch



\### Version Control



\* Git

\* GitHub



\---



\## Project Setup



\### Install Dependencies



```bash

npm install

```



\### Start Development Server



```bash

npm run start:dev

```



\### Application URL



```text

http://localhost:3000

```



If the setup is successful, the NestJS application should start without any errors and be accessible locally.



\---



\## Project Structure



```text

Schedula-Pranav/



├── README.md



├── docs/

│   ├── project-overview.md

│   ├── entity-analysis.md

│   └── ER-DIAGRAM.png



├── screenshots/

│   └── nest-app-running.png



└── schedula-backend/

&#x20;   ├── src/

&#x20;   ├── test/

&#x20;   ├── package.json

&#x20;   └── ...

```



\---



\## Core Backend Modules Identified



Based on the workflow analysis, the following modules were identified as essential for the system:



\### User Module



Responsible for authentication and role management.



\### Doctor Module



Responsible for storing and managing doctor-related information.



\### Patient Module



Responsible for maintaining patient-specific records.



\### Availability Module



Responsible for managing doctor availability and consultation slots.



\### Appointment Module



Responsible for booking, rescheduling, cancelling, and tracking appointments.



\### Notification Module



Responsible for appointment confirmations, reminders, and system notifications.



\---



\## Database Design Approach



Before creating the ER Diagram, I analyzed the workflow and identified the relationships between different entities.



The primary entities selected were:



\* User

\* Doctor

\* Patient

\* Availability

\* Appointment

\* Notification



Some key design decisions:



\* A centralized User entity is used for authentication and role management.

\* Doctor and Patient are separated to avoid data duplication.

\* Availability is maintained independently from appointments to prevent scheduling conflicts.

\* Notifications are linked to users so that reminders and updates can be managed efficiently.



This approach keeps the design simple, normalized, and scalable for future development.



\---



\## Deliverables Completed



\### Project Setup



\* NestJS application successfully created

\* Application runs locally without errors



\### Documentation



\* Project overview document created

\* Entity analysis document created



\### Database Design



\* ER Diagram created based on workflow analysis

\* Relationships and foreign keys identified



\### Version Control



\* Repository created using GitHub

\* Feature branch workflow followed

\* Pull Request raised for review



\---



\## Key Learnings



Through this assignment, I gained a better understanding of:



\* NestJS project structure

\* Modular backend architecture

\* Entity relationship modeling

\* Database design fundamentals

\* Git branching workflow

\* Pull Request based collaboration



More importantly, I learned the importance of understanding business requirements before starting implementation.



\---



\## Author



\*\*Pranav Dogra\*\*



Backend Internship Program – Day 1 Submission



