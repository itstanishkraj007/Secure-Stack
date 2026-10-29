# Multi-stage Dockerfile for SecureStack Spring Boot Core API
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /workspace

# Copy build definition
COPY pom.xml .
COPY src ./src

# Build production jar skipping test phase in container build
RUN apk add --no-cache maven && \
    mvn clean package -DskipTests

# Runtime Stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=builder /workspace/target/*.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=production

ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
