# Prompt 01 — Repository and Spring Boot Foundation

Read the master prompt and architecture docs. Implement the first working Spring Boot API in `backend/`.

## Requirements
- Use a supported Spring Boot release compatible with Java 21 and Maven Wrapper.
- Include Spring Web, Validation, Actuator, Spring Security baseline, PostgreSQL driver, migration tool (choose Flyway or Liquibase), and OpenAPI.
- Add profiles for `local`, `test` and `production`; local is default only in developer setup.
- Add `/api/v1/health/live` and `/api/v1/health/ready`.
- Read configuration from environment variables; validate required production config at startup.
- Add request correlation ID propagation and structured logs.
- Configure CORS using an environment-based allowlist; do not use wildcard origins with credentials.
- Define a global error response format with a trace/correlation ID and no stack trace in client responses.
- Add an OpenAPI document and API versioning conventions.
- Add tests for health endpoints, invalid config and error format.
- Keep authentication as a clearly documented initial boundary; do not pretend a production identity provider has been configured.

## Acceptance
- `./mvnw test` succeeds.
- `./mvnw spring-boot:run` starts locally.
- Health endpoints return appropriate statuses.
- No real secrets or external provider calls are required.
- README includes exact commands and environment requirements.
