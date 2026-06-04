# Entity Analysis

## Purpose

The Schedula platform is designed to facilitate appointment scheduling between patients and doctors. To support this workflow, the database must manage user authentication, doctor availability, appointment bookings, and notification delivery.

-----

## Core Entities

### User

Acts as the base entity for authentication and authorization.

Attributes:

* id
* email
* password_hash
* role
* created_at

A User can be either a Doctor or a Patient.

-----

### Doctor

Stores professional information related to healthcare providers.

Attributes:

* id
* user_id
* specialization
* license_number
* years_experience
* bio

Relationship:

* One User → One Doctor
* One Doctor → Many Availability Slots
* One Doctor → Many Appointments

-----

### Patient

Stores patient-specific information.

Attributes:

* id
* user_id
* date_of_birth
* blood_type
* emergency_contact

Relationship:

* One User → One Patient
* One Patient → Many Appointments

----

### Availability

Represents a doctor's available consultation slots.

Attributes:

* id
* doctor_id
* date
* start_time
* end_time
* is_booked

Relationship:

* One Doctor → Many Availability Slots
* One Availability Slot → One Appointment

----

### Appointment

Represents a booking between a patient and a doctor.

Attributes:

* id
* doctor_id
* patient_id
* availability_id
* status
* notes
* created_at

Relationship:

* One Doctor → Many Appointments
* One Patient → Many Appointments

----

### Notification

Stores appointment reminders and system notifications.

Attributes:

* id
* user_id
* title
* message
* type
* is_read
* created_at

Relationship:

* One User → Many Notifications

----

## Key Design Decisions

### User as Base Entity

Authentication information is stored in a centralized User table. This prevents duplication and simplifies role management.

### Availability Separate from Appointment

Availability exists before an appointment is booked. This design prevents double-booking and allows slots to be reused after cancellations.

### Notifications as Independent Entity

Notifications are linked to users rather than doctors or patients directly, making the system more flexible and scalable.

----

## Planned Relationships

* User 1:1 Doctor
* User 1:1 Patient
* Doctor 1:N Availability
* Doctor 1:N Appointment
* Patient 1:N Appointment
* Availability 1:1 Appointment
* User 1:N Notification
