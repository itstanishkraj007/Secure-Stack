# Infrastructure and deployment

## Local
Docker Compose provides PostgreSQL, MinIO and Redis for development. Spring Boot, Python and React run as separate developer processes initially.

## AWS deployment proposal
1. Create separate development/staging/production environments.
2. Provision private S3 bucket with encryption, block-public-access, lifecycle and access logging appropriate to approved retention.
3. Provision RDS PostgreSQL in private subnets with backups and restricted security groups.
4. Deploy Spring Boot API to App Runner or ECS Fargate.
5. Deploy Python API/worker separately; worker must have no public ingress unless required.
6. Provision the chosen Celery broker.
7. Use Secrets Manager / Parameter Store and IAM roles.
8. Configure CloudWatch logs, metrics, alarms and retention.
9. Use GitHub Actions with OIDC role assumption when supported.
10. Configure Vercel production environment variables and restrict CORS to approved frontend domains.
11. Add TLS, domain, rate limiting, backup restore test, incident/runbook and cost alerts.

Do not provision production infrastructure until the team has selected the AWS compute and broker services, reviewed expected cost, and defined environment ownership.
