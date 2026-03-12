# Skynet Ops Audit Service

## Overview

The **Skynet Ops Audit Service** is a lightweight API designed to collect and retrieve operational audit events. The service is built with a focus on **containerization, operational reliability, observability, and cost-efficient cloud deployment**.

This project was developed as part of a **Cloud Operations technical assessment**.

---

# Features

* REST API for storing and retrieving audit events
* Containerized deployment using Docker
* Local orchestration using Docker Compose
* Lightweight SQLite event storage
* Cloud deployment architecture for AWS
* Cost-optimized infrastructure design
* Operational runbook for service management

---

# API Endpoints

### Health Check

GET `/health`

Example response:

```
{
  "status": "ok",
  "service": "skynet-ops-audit-service"
}
```

---

### Create Event

POST `/events`

Example request body:

```
{
  "type": "roster_update",
  "tenantId": "academy_001",
  "severity": "info",
  "message": "Instructor schedule adjusted",
  "source": "skynet-api"
}
```

Example response:

```
{
  "success": true,
  "eventId": "evt_xxxxx",
  "storedAt": "timestamp"
}
```

---

### Retrieve Events

GET `/events`

Supports query filters:

* tenantId
* severity
* limit
* offset

Example:

```
/events?tenantId=academy_001
```

---

# Project Structure

```
skynet-ops-audit-service
│
├── app/                  # Node.js application
│
├── docker/               # Dockerfile
│
├── docs/
│   ├── architecture.md
│   ├── cost-estimation.md
│   └── ops-runbook.md
│
├── terraform/            # Infrastructure as Code
│
├── .github/workflows/    # CI pipeline
│
├── docker-compose.yml
├── package.json
└── README.md
```

---

# Running the Service Locally

## Install dependencies

```
npm install
```

## Start service

```
npm run dev
```

The service will run at:

```
http://localhost:3000
```

---

# Running with Docker

Build image:

```
docker build -t skynet-audit-service -f docker/Dockerfile .
```

Run container:

```
docker run -p 3000:3000 skynet-audit-service
```

---

# Running with Docker Compose

Start the service:

```
docker-compose up --build
```

Stop the service:

```
docker-compose down
```

---

# Architecture

The service is designed for **cost-efficient cloud deployment**.

High level architecture:

```
Client
   ↓
Load Balancer
   ↓
Containerized Audit Service
   ↓
SQLite Storage
   ↓
CloudWatch Logging & Monitoring
```

Detailed architecture explanation is available in:

```
docs/architecture.md
```

---

# Observability

Monitoring is implemented through:

* Application logs
* Container logs
* CloudWatch monitoring
* Health check endpoint

Detailed Observability in:

```
docs/observability.md
```

---

# Cost Optimization

The infrastructure is designed to operate within **$25–$75 per month**.

Estimated cost range:

```
$31 – $46 per month
```

Detailed cost analysis:

```
docs/cost-estimation.md
```

---

# Operations Runbook

Operational procedures for running and troubleshooting the service are documented in:

```
docs/runbook.md
```

---

# Environment Variables

Example configuration:

```
PORT=3000
NODE_ENV=development
SERVICE_NAME=skynet-ops-audit-service
```

Example file:

```
.env.example
```

---

# Infrastructure (Terraform)

Terraform is used to define AWS infrastructure.

Resources created:

```
ECS Cluster

ECR Repository

CloudWatch Log Group
```
Initialize Terraform

```
cd terraform
terraform init
```

Validate configuration

```
terraform validate
```

---

# CI Pipeline

GitHub Actions pipeline runs on every push and performs:

```
Install Node dependencies

Build Docker image

Validate Terraform configuration
```

Pipeline configuration:

```
.github/workflows/ci.yml
```
