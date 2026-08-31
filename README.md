<!-- Title & Cover -->
<h1 align="center">  
  Sapmi Riwi MediCare Plus
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
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Seeders](#seeders)
- [API Documentation](#api-documentation)
- [Repository](#repository)
- [Author](#author)

---

## Project Description

Sapmi Riwi MediCare Plus es un sistema de gestión de inventario de medicamentos para clínicas. Permite registrar clínicas y sus responsables, administrar el inventario de medicamentos en almacenes, crear solicitudes de abastecimiento, asignar solicitudes a almacenes, controlar el estado de cada solicitud y consultar el historial de solicitudes por clínica.

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
| **File Upload**    | Multer v2.3.0           |
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
- **Security**: JWT authentication with bcrypt password hashing
- **Validation**: Automatic request validation with class-validator
- **Documentation**: Auto-generated Swagger docs at `/api/docs`
- **Database**: Automated migrations and seeders
- **File Upload**: JSON file upload for bulk data seeding
- **Testing**: Jest configuration for unit tests

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database Configuration
DB_CONTAINER_NAME=sapmi-db
POSTGRES_USER=nodejs
POSTGRES_PASSWORD=123456
POSTGRES_DB=postgres
POSTGRES_PORT=5432
POSTGRES_HOST=db
POSTGRES_HOST_PORT=5433

# Application Configuration
APP_CONTAINER_NAME=sapmi-backend
APP_PORT=5001
APP_URL=http://localhost:5001
CORS_ORIGIN=http://localhost:5001

# JWT Configuration
JWT_SECRET=o5mOGp11Q98B1BQxol2e6TgOyjHAqAglpRAzWix6mlVi6kgoFuPj_mHc_SbT2Gtr
JWT_REFRESH_SECRET=Ytmtnqk0on3n9HKhm4JNwhBCMWEKYeovToyRRFrULGMA7eFwdM53t0o8uGWgIpza

# Security
SALT_ROUNDS=10
MAX_FAILED_ATTEMPTS=5

# Environment
NODE_ENV=development

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Resource Limits
DB_CPU_LIMIT=2
DB_MEM_LIMIT=512MB
APP_CPU_LIMIT=2
APP_MEM_LIMIT=512MB
```

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

##  Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v20.x
- [Docker](https://www.docker.com/) and Docker Compose
- [Git](https://git-scm.com/)

### Steps

```bash
# Clone repository
git clone https://github.com/danielbaneado/Prueba-Nodejs.git
cd Prueba-Nodejs

# Install dependencies
cd app && npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Return to project root
cd ..
```

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

## Running the Project

### Using Docker (Recommended)

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Development Mode (without Docker)

```bash
# Make sure PostgreSQL is running locally
# Update .env with local database credentials

# Start in development mode
cd app && npm run dev
```

### Verify Installation

```bash
# Test endpoint
curl http://localhost:5001/api/test

# Expected response:
# {"message":"Servidor funcionando correctamente!"}
```

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

## Seeders

The project includes seeders to load test data into the database.

### Run Default Seed

Creates default data including admin user, gestor, clinic, warehouse, medications, and sample supply requests.

#### Via API Endpoint
```bash
curl -X POST http://localhost:5001/api/seed/run-default
```

#### Via NPM Script
```bash
cd app && npm run seed
```

#### Default Credentials
| Role  | Email                      | Password   |
| ----- | -------------------------- | ---------- |
| Admin | danielalzate076@gmail.com  | Admin123!  |
| Gestor| gestor@sapmi.com           | Gestor123! |

### Upload Custom Seed File (JSON)

Upload a JSON file with custom data for clinics, warehouses, medications, inventories, and supply requests.

```bash
curl -X POST -F "file=@seed-data.json" http://localhost:5001/api/seed/upload
```

#### JSON File Format Example
```json
{
  "clinics": [
    {
      "name": "Clínica Ejemplo",
      "NIT": "900999999-1",
      "address": "Calle 100 # 10 - 20",
      "phone": "3009999999",
      "email": "clinic@example.com",
      "responsibleUserId": 1,
      "status": "active"
    }
  ],
  "warehouses": [
    {
      "name": "Almacén Norte",
      "address": "Carrera 15 # 80 - 30",
      "phone": "3008888888",
      "email": "warehouse@example.com",
      "managerId": 1,
      "status": "active"
    }
  ],
  "medications": [
    {
      "name: "Aspirina",
      "description": "Analgésico y antiinflamatorio",
      "unit": "tabletas",
      "category": "Analgésicos",
      "status": "active"
    }
  ],
  "inventories": [
    {
      "warehouseId": 1,
      "medicationId": 1,
      "stock": 1000,
      "minStock": 100,
      "status": "active"
    }
  ],
  "supplyRequests": [
    {
      "clinicId": 1,
      "medicationId": 1,
      "warehouseId": 1,
      "quantity": 50,
      "status": "pending",
      "notes": "Solicitud de prueba"
    }
  ]
}
```

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

## API Documentation

Interactive API documentation is available via Swagger UI:

```
http://localhost:5001/api/docs
```

### Main Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/clinics` | Get all clinics |
| POST | `/api/clinics` | Create clinic |
| GET | `/api/warehouses` | Get all warehouses |
| POST | `/api/warehouses` | Create warehouse |
| GET | `/api/medications` | Get all medications |
| POST | `/api/medications` | Create medication |
| GET | `/api/inventories` | Get all inventories |
| POST | `/api/inventories` | Create inventory |
| GET | `/api/supply-requests` | Get all supply requests |
| POST | `/api/supply-requests` | Create supply request |
| PATCH | `/api/supply-requests/:id/status` | Update request status |
| POST | `/api/seed/run-default` | Run default seeder |
| POST | `/api/seed/upload` | Upload seed file |

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

## Repository

GitHub: [https://github.com/danielbaneado/Prueba-Nodejs](https://github.com/danielbaneado/Prueba-Nodejs)

<div align=right>

[Back to top](#-table-of-contents)

</div>

---

## Author

| Name              | Role               | Path |
| ----------------- | ------------------ | ---- |
| **Daniel Alzate** | Backend Developer  | Node |

<div align=right>

[Back to top](#-table-of-contents)

</div>
