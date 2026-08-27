<!-- Title & Cover -->
<h1 align="center">  
  Sapmi services
</h1>

<!-- Badges -->
<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v20.19.43-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.9.3-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express-v5.2.1-lightgrey?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v8.22.0-blue?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![Tests](https://img.shields.io/badge/Tests-Jest%20v29.7.0-red?logo=jest)

</div>

---

##  Table of Contents

- [Table of Contents](#table-of-contents)
- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Documentation](#documentation)
- [Installation](#installation)
- [Deploy all the project in Docker](#deploy-all-the-project-in-docker)
  - [Linux/macOS](#linuxmacos)
  - [Windows (Command Prompt)](#windows-command-prompt)
  - [Windows (PowerShell)](#windows-powershell)
- [👥 Author](#-author)

---

## Project Description

<!-- Business logic description to be added -->

Built with **Node.js**, **TypeScript**, and **PostgreSQL** under a modular and scalable architecture.

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

## Technologies Used

| Category           | Technologies            |
| ------------------ | ----------------------- |
| **Language**       | TypeScript v5.9.3       |
| **Runtime**        | Node.js v20.19.43       |
| **Framework**      | Express v5.2.1          |
| **Database**       | PostgreSQL + Sequelize v6.37.3 |
| **Authentication** | JWT + bcryptjs v3.0.3   |
| **Documentation**  | Swagger / OpenAPI       |
| **Testing**        | Jest v29.7.0            |
| **Containers**     | Docker / Docker Compose |

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

## Architecture

```
app/src/
├── config/        # Cookie and database parameters
├── controllers/   # HTTP request handlers
├── docs/          # Swagger doc
├── dto/           # Data validation objects
├── error/         # Global error handler
├── middlewares/    # Custom middlewares
├── models/        # Database models
├── repositories/  # Data access layer
├── routes/        # API endpoints
├── seeders/       # Database seeders
├── services/      # Business logic
├── types/         # Useful to return JwtPayload and declarate it globally
├── utils/         # JWT, bcrypt and password validations
```

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

##  Key Features

- **Modular Architecture**: REPOSITORIES/DTO patterns with service layer
- **Security**: JWT authentication
- **Validation**: Automatic request validation with class-validator
- **Documentation**: Auto-generated Swagger docs
- **Database**: Automated migrations and seeders
- **Testing**: Jest configuration for unit tests

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

##  Documentation

Detailed documentation available in `/docs`:



<div align=right>

[Back to top](#-table-of-contents)

</div>

---

##  Installation

```bash
# Clone repository
git clone <repository-url>
cd workdir

# Install dependencies
cd app && npm install

# Configure environment
cp .env.example .env

# Start with Docker
docker-compose up -d

# Or start in development mode
npm run dev
```

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

##  Deploy all the project in Docker

### Linux/macOS
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

```

### Windows (Command Prompt)
```cmd
REM Start all services
docker-compose up -d

REM alternative
docker-compose up --build

REM View logs
docker-compose logs -f

REM Stop services
docker-compose down

```

### Windows (PowerShell)
```powershell
# Start all services
docker-compose up -d

# alternative
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

```

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

## 👥 Author

| Name              | Role               | Path |
| ----------------- | ------------------ | ---- |
| **Daniel Alzate** | Backend Developer  | Node |

<div align=right>

[Back to top](#-table-of-contents)

</div>
