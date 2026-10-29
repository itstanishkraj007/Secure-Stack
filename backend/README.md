# Secure Stack Backend — AICTE Security Deposit Management System

Primary Spring Boot 3.3.x service providing domain models, persistence, transactional business rules, and API gateways for the AICTE Security Deposit / FDR Management Portal.

## Tech Stack
- **Runtime**: Java 21 LTS
- **Framework**: Spring Boot 3.3.4
- **Persistence**: Spring Data JPA, Hibernate, PostgreSQL (production) / H2 (local testing)
- **Security**: Spring Security 6 (stateless REST, CORS policy, strict headers)
- **API Spec**: OpenAPI 3 / Swagger (`/swagger-ui/index.html`)
- **Container**: Multi-stage Dockerfile (`eclipse-temurin:21-jre-alpine`)

## Key Endpoints
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/health/live` | Liveness probe |
| `GET` | `/api/v1/health/ready` | Readiness probe (database, cache) |
| `GET` | `/api/v1/instruments` | List all security deposit instruments |
| `POST` | `/api/v1/instruments` | Register / Submit a new FDR instrument |
| `GET` | `/api/v1/scrutiny/cases` | List open scrutiny discrepancy cases |
| `POST` | `/api/v1/clearance/requests/{id}/gates/{n}/resolve` | Sequentially clear clearance gates |
| `GET` | `/api/v1/audit/events` | Retrieve immutable audit trail |
| `POST` | `/api/v1/audit/verify-chain` | Cryptographic SHA-256 chain verification |

## Running Locally

### With Maven:
```bash
mvn spring-boot:run
```
By default, the `local` profile runs with an in-memory H2 database seeded with high-fidelity SIH demo data.

### Swagger Documentation:
Visit [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html) once running.
