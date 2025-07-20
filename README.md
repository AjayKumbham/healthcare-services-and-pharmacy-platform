# Price A Med – Healthcare Services & Pharmacy Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status: Production](https://img.shields.io/badge/status-production-brightgreen)]()
[![Java](https://img.shields.io/badge/backend-Java%20%7C%20Spring%20Boot-blue)]()
[![React](https://img.shields.io/badge/frontend-React%20%7C%20Tailwind%20CSS-blueviolet)]()

---

## Table of Contents
1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Architecture](#architecture)
6. [Documentation Index](#documentation-index)
7. [Project Credits](#project-credits)
8. [License](#license)

---

## Overview
**Price A Med** is a comprehensive, enterprise-grade platform for healthcare services, pharmacy management, and prescription handling. Developed as a team project for Evernorth Health Services as part of a case study, this product is designed to meet real-world healthcare and pharmacy needs with a robust, modular, and secure architecture.

---

## Quick Start
- **Explore the Docs:**
  - See [Features](docs/FEATURES.md) for a detailed breakdown of what the platform offers.
  - Review [ARCHITECTURE.md](docs/ARCHITECTURE.md) for a high-level system overview.
  - Dive into [API_REFERENCE.md](docs/API_REFERENCE.md) for every API endpoint, request/response, and error code.
  - Understand the [Data Model](docs/DATA_MODEL.md) for all entities and relationships.
  - Browse [UI_OVERVIEW.md](docs/UI_OVERVIEW.md) for user journeys and interface structure.
- **Run Locally:**
  - Clone the repo, install dependencies in `/frontend` and `/backend`, and follow the setup instructions in each directory.
  - (See each subdirectory's README or documentation for environment variables and configuration.)

---

## Features
- User authentication (OTP, membership ID, JWT)
- Pharmacy and inventory management
- Prescription upload and parsing
- Cart and order management
- Health dashboard (conditions, allergies, medications)
- Admin panel for consumer/store/inventory management
- Membership plans and discounts
- 24/7 support and chatbot
- Secure, role-based access
- Email/SMS notifications
- Modular, scalable codebase

---

## Tech Stack
- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Java, Spring Boot, JPA/Hibernate
- **Database:** (e.g., MySQL/PostgreSQL)
- **Other:** JWT, Email/SMS integration

---

## Architecture
A modular, layered architecture separates concerns between frontend, backend, and data storage. The backend exposes RESTful APIs, enforces security, and manages business logic, while the frontend provides a modern, responsive user interface. For a detailed architecture diagram and explanation, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Documentation Index
- [Features](docs/FEATURES.md)
- [System Architecture](docs/ARCHITECTURE.md)
- [API Reference (All Endpoints)](docs/API_REFERENCE.md)
- [Data Model](docs/DATA_MODEL.md)
- [UI Overview](docs/UI_OVERVIEW.md)

---

## Project Credits
Developed as a team project for Evernorth Health Services as part of a case study.

---

## License
This project is open source under the [MIT License](LICENSE). 