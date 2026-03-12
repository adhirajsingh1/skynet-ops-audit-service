The Skynet Ops Audit Service is a lightweight Node.js microservice that records and retrieves operational events. The service is containerized using Docker and designed to run on AWS infrastructure defined using Terraform.

Components
1. API Service

The core service is a Node.js Express application that exposes REST APIs to record and retrieve events.

Key endpoints:

POST /events → store an operational event

GET /events → retrieve events

GET /health → health check endpoint

Events are stored in a SQLite database for simplicity.

2. Containerization (Docker)

The application is packaged using Docker, ensuring the service runs consistently across environments.

Docker provides:

Environment consistency

Easy deployment

Simplified dependency management

The container exposes port 3000.

3. Container Orchestration (AWS ECS)

The service is designed to run in an AWS ECS cluster.

ECS manages:

Container deployment

Service scaling

Container health monitoring

4. Container Registry (AWS ECR)

The Docker image is stored in AWS Elastic Container Registry (ECR).

Flow:

Application image is built using Docker.

Image is pushed to ECR.

ECS pulls the image from ECR and runs the container.

5. Infrastructure as Code (Terraform)

AWS infrastructure is defined using Terraform, enabling reproducible deployments.

Terraform provisions:

ECS cluster

ECR repository

CloudWatch log group

This allows infrastructure to be version controlled and easily recreated.

6. Observability (Logging)

Application logs are stored in AWS CloudWatch Logs.

This allows:

Monitoring application behavior

Troubleshooting failures

Tracking service activity

7. CI Pipeline (GitHub Actions)

A GitHub Actions pipeline automates build and validation steps.

The pipeline performs:

Install Node dependencies

Run basic checks

Build Docker image

Validate Terraform configuration

This ensures code changes do not break the build.

High-Level Architecture Diagram
Developer
   │
   │ Push Code
   ▼
GitHub Repository
   │
   ▼
GitHub Actions CI
   │
   ├── Install Dependencies
   ├── Build Docker Image
   └── Terraform Validate
   │
   ▼
Docker Image
   │
   ▼
AWS ECR
   │
   ▼
AWS ECS Cluster
   │
   ▼
Skynet Ops Audit Service Container
   │
   ▼
SQLite Database
   │
   ▼
CloudWatch Logs