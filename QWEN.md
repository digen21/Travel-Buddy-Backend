# Travel Buddy Backend - Project Documentation

Role: You are a Senior Solutions Architect and Backend Developer specializing in NestJS, TypeScript, and scalable system design.

Objective: I need to build a production-grade, high-performance REST API. Your task is to scaffold the project structure, provide boilerplate code, and explain the system design.

Tech Stack:

Framework: NestJS (Latest)
Language: TypeScript
Database: PostgreSQL
ORM: Prisma
Validation: class-validator and class-transformer
Auth: JWT (Access + Refresh Tokens), Manual (Email/Password), and Google OAuth2.
Containerization: Docker & Docker Compose
Code Style: Strict typing, Clean Architecture (Controller -> Service -> Repository), Modular design.
Requirements:

Project Structure:
Create a folder structure following NestJS best practices (separate modules for Auth, Users, Health, etc.).
Include shared modules for decorators, guards, and interceptors.
Database Design (Prisma):
Define a schema.prisma file.
Include models: User (id, email, password, provider, googleId, createdAt), RefreshToken (token, userId, expiry).
Ensure proper indexing and relations.
Authentication Module:
Manual Auth: Register and Login endpoints. Passwords must be hashed (bcrypt).
Google Auth: Implement GoogleStrategy using Passport. Explain the flow (Frontend gets code -> Backend exchanges for token -> Verifies user -> Issues JWT).
JWT Strategy: Use Access tokens (short-lived) and Refresh tokens (long-lived stored in DB).
Guards: Create JwtGuard and Public decorator.
Validation & Error Handling:
Implement a global exception filter to standardize error responses (JSON: { statusCode, message, error, timestamp }).
Use DTOs with class-validator decorators for all inputs.
System Design & Performance:
Explain how to handle concurrent requests.
Discuss configuration management (using .env and the @nestjs/config module).
Docker Setup:
Provide a Dockerfile optimized for production (multi-stage build).
Provide a docker-compose.yml to spin up the NestJS app and PostgreSQL instance.
Output:
Provide the file structure first, followed by the specific code for schema.prisma, auth.module.ts, auth.controller.ts, auth.service.ts, google.strategy.ts, main.ts, and Dockerfile.

## Project Overview

Travel Buddy Backend is a server-side application built with the NestJS framework using TypeScript. It serves as the backend for a travel companion application, providing RESTful APIs for managing travel-related data and user interactions.

The application follows modern development practices with a modular architecture, leveraging decorators, dependency injection, and asynchronous programming patterns. It integrates with a PostgreSQL database using Prisma ORM for efficient data access and management.

## Architecture & Technology Stack

### Core Framework

- **NestJS v11**: A progressive Node.js framework for building efficient and scalable server-side applications
- **TypeScript**: Strongly typed superset of JavaScript that compiles to plain JavaScript
- **Node.js**: JavaScript runtime built on Chrome's V8 engine

### Database & Data Access

- **PostgreSQL**: Robust, open-source object-relational database system
- **Prisma ORM**: Modern database toolkit for Node.js and TypeScript
- **@prisma/adapter-pg**: PostgreSQL adapter for Prisma
- **@prisma/client**: Type-safe database client generated from Prisma schema

### Logging & Monitoring

- **Pino**: Extremely fast Node.js logger with a low overhead
- **nestjs-pino**: Official NestJS module for Pino logger integration
- **pino-pretty**: Pretty printing for Pino logs during development

### Configuration & Utilities

- **@nestjs/config**: Configuration management with environment variables
- **compression**: HTTP compression middleware for Express.js
- **reflect-metadata**: Metadata reflection API implementation

### Testing & Quality Assurance

- **Jest**: Delightful JavaScript testing framework with a focus on simplicity
- **Supertest**: HTTP assertion library for testing Node.js applications
- **ESLint**: Pluggable JavaScript linter for identifying and reporting syntax issues
- **Prettier**: Opinionated code formatter for consistent code style

## Project Structure

```
travel-buddy-backend/
├── src/
│   ├── app.module.ts         # Main application module
│   ├── main.ts               # Application entry point
│   ├── pino-logger/          # Logging module configuration
│   │   └── pino-logger.module.ts
│   └── prisma/               # Database module
│       ├── prisma.module.ts
│       ├── prisma.service.ts
│       └── prisma.service.spec.ts
├── prisma/
│   └── schema.prisma         # Prisma schema definition
├── test/                     # Test files
├── .env.example             # Environment variable template
├── .gitignore
├── nest-cli.json            # Nest CLI configuration
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
├── tsconfig.json            # TypeScript configuration
└── tsconfig.build.json      # TypeScript build configuration
```

## Environment Variables

The application uses environment variables for configuration:

- `NODE_ENV`: Environment mode (development, production, test)
- `PORT`: Port number for the server (default: 5000)
- `DATABASE_URL`: Connection string for the PostgreSQL database

## Building and Running

### Prerequisites

- Node.js (version compatible with the project)
- Yarn package manager
- PostgreSQL database instance

### Setup Instructions

1. **Install Dependencies**:

   ```bash
   $ yarn install
   ```

2. **Database Setup**:

   ```bash
   # Generate Prisma client
   $ yarn run prisma:generate

   # Run migrations
   $ yarn run prisma:migrate-dev

   # Or open Prisma Studio for database management
   $ yarn run prisma:studio
   ```

3. **Running the Application**:

   ```bash
   # Development mode
   $ yarn run start:dev

   # Production mode
   $ yarn run start:prod

   # Standard start
   $ yarn run start
   ```

4. **Testing**:

   ```bash
   # Unit tests
   $ yarn run test

   # Watch mode for tests
   $ yarn run test:watch

   # End-to-end tests
   $ yarn run test:e2e

   # Test coverage
   $ yarn run test:cov
   ```

5. **Code Quality**:

   ```bash
   # Linting
   $ yarn run lint

   # Formatting with Prettier
   $ yarn run prettier:write

   # Check formatting
   $ yarn run prettier:check
   ```

## Development Conventions

### Coding Standards

- Follow NestJS best practices and conventions
- Use TypeScript for strong typing and better development experience
- Implement proper error handling and logging
- Follow SOLID principles where applicable
- Use dependency injection for loose coupling

### Naming Conventions

- Use PascalCase for classes and modules
- Use camelCase for methods, properties, and variables
- Use UPPER_SNAKE_CASE for constants
- Use kebab-case for file names

### Testing Practices

- Write unit tests for all business logic
- Implement end-to-end tests for critical user flows
- Maintain high test coverage percentages
- Use mocks and stubs appropriately in tests

### Code Organization

- Organize code in feature-based modules
- Separate concerns with dedicated services
- Use DTOs (Data Transfer Objects) for API inputs/outputs
- Implement guards and interceptors for cross-cutting concerns

## Key Features

### Database Integration

- Prisma ORM for type-safe database access
- PostgreSQL as the primary database
- Automatic migration handling
- Connection pooling and optimization

### Logging System

- Structured logging with Pino
- Different log levels for development and production
- Custom serializers for request/response objects
- Pretty-printed logs in development

### Configuration Management

- Environment-based configuration
- Global configuration module
- Type-safe access to configuration values

### Performance Optimization

- HTTP compression middleware
- Efficient database queries through Prisma
- Proper caching strategies
- Asynchronous processing where appropriate

## Deployment

### Production Build

```bash
$ yarn run build
```

### Production Deployment

```bash
$ yarn run start:prod
```

### Cloud Deployment Options

- The application can be deployed to cloud platforms supporting Node.js applications
- Docker containerization is recommended for consistent deployments
- Environment-specific configurations should be managed through environment variables

## Security Considerations

- Input validation and sanitization
- Proper authentication and authorization mechanisms
- Secure handling of sensitive data
- Protection against common vulnerabilities (SQL injection, XSS, etc.)

## Troubleshooting

### Common Issues

- Ensure DATABASE_URL is properly configured
- Check that the PostgreSQL service is running
- Verify that migrations have been applied
- Confirm that required environment variables are set

### Debugging

- Use the debug mode: `yarn run start:debug`
- Check logs for error messages
- Use Prisma Studio to inspect database state
- Enable verbose logging during development

## Future Enhancements

Potential areas for improvement:

- API documentation with Swagger/OpenAPI
- Authentication and authorization implementation
- Additional database entities and relationships
- Caching layer implementation
- Monitoring and alerting systems
- Automated CI/CD pipeline
