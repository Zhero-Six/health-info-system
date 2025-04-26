# health-info-system
# Health Information System

A concise health information system for managing clients and health programs, built for the CEMA Software Engineer Intern application.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Bonuses and Innovations](#bonuses-and-innovations)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Security Considerations](#security-considerations)
- [Deployment](#deployment)
- [Prototype Demonstration](#prototype-demonstration)
- [Presentation](#presentation)
- [License](#license)
- [Author](#author)

## Overview
This project implements a minimal health information system for doctors to manage health programs (e.g., TB, Malaria) and clients. It supports creating programs, registering clients, enrolling clients in programs, searching clients, viewing profiles, and exposing profiles via a RESTful API. The solution is clean, well-documented, and includes all required features and bonuses, kept short as per guidelines.

## Features
- **Create Health Program**: Add programs with name and description.
- **Register Client**: Register clients with name, date of birth, and contact.
- **Enroll Client in Programs**: Assign clients to multiple programs.
- **Search Clients**: Search by name with fuzzy matching.
- **View Client Profile**: Display client details and enrolled programs.
- **API Access**: RESTful API to retrieve client profiles.

## Bonuses and Innovations
- **Tests**: Unit and integration tests for backend (Jest, Supertest) and frontend (Jest).
- **API-First**: Designed RESTful endpoints first for scalability.
- **Innovations**:
 - Fuzzy search for robust client lookup.
 - Analytics endpoint for program enrollment counts.
- **Security**:
 - JWT-based authentication for secure access.
 - Input sanitization to prevent XSS.
 - Password hashing with bcrypt.
- **Deployment**: Hosted on Render with CI/CD via GitHub Actions.

## Tech Stack
- **Backend**: Node.js, Express, SQLite (Sequelize), JWT, bcrypt
- **Frontend**: React, Axios
- **Testing**: Jest, Supertest
- **Deployment**: Render, GitHub Actions

## Setup Instructions
1. **Clone the Repository**:
 ```bash
 git clone https://github.com/victormochoge/health-info-system.git
 cd health-info-system