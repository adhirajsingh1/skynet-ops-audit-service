# AIRMAN Skynet Cloud Ops Intern Assessment — Submission Checklist

## 1) Candidate & Submission Info

Name: Adhiraj Singh
Email: singhadhiraj0500@gmail.com
Chosen Cloud Platform: AWS
Assessment Level Submitted: Level 1 + Level 2
Level 2 Option Chosen: Option B — CI/CD for Safe Cloud Deployments
GitHub Repo Link: https://github.com/adhirajsingh1/skynet-ops-audit-service
Demo Video Link: (add after recording)
Submission Date (UTC): 2026-03-13

---

# 2) What I Implemented (Summary)

### Level 1

[x] Mini service (/health, /events)
[x] Dockerized service
[x] Cloud deployment (IaC-backed deployment plan)
[x] Infrastructure as Code
[x] Cost optimization report
[x] Observability setup (documented)
[x] Security/secrets approach
[x] Ops runbook
[x] README with setup + teardown

### Level 2

[x] Option B — CI/CD for Safe Cloud Deployments

---

# 3) Repository Structure

### Service Code

Service path: app/
Main entry file: app/server.js
Local run command: npm start

### Docker

Dockerfile path: docker/Dockerfile
.dockerignore path: .dockerignore

### Infrastructure as Code

IaC tool used: Terraform
IaC root path: terraform/
Environment config files: none (simple configuration used)

### Docs

README path: README.md
Cost report path: docs/cost-estimation.md
Runbook path: docs/ops-runbook.md
Observability notes/dashboard path: docs/architecture.md
Security/secrets notes path: README.md + .env.example

### Level 2

Level 2 implementation path(s): .github/workflows/ci.yml
Level 2 documentation path: README.md

---

# 4) Local Run Instructions

### Prerequisites

[x] Docker installed
[x] Language runtime installed (Node.js)
[x] Terraform installed
[ ] Cloud CLI installed

### Local Setup

npm install

### Run Service Locally

npm start

Service runs on:
http://localhost:3000

### Run Using Docker

docker build -t skynet-audit-service -f docker/Dockerfile .
docker run -p 3000:3000 skynet-audit-service

### Test Endpoints

curl http://localhost:3000/health

curl -X POST http://localhost:3000/events 
-H "Content-Type: application/json" 
-d '{"type":"deployment","message":"service deployed"}'

curl http://localhost:3000/events

---

# 5) API Endpoint Checklist (Functional Validation)

[x] GET /health works
[x] POST /events stores an event
[x] GET /events returns events
[x] Validation rejects bad payloads

Optional
[ ] GET /metrics-demo implemented

---

# 6) Cloud Deployment Summary

Deployment Type
[x] IaC + mock/deploy plan only (not actually provisioned)

Cloud Services Used

Compute: AWS ECS (fargate)
Storage/DB: SQLite
Networking/Ingress: ECS networking
Logging/Monitoring: AWS CloudWatch Logs
Secrets: Environment variables (.env)
Budgeting/Alerts: Documented in cost report
Container Registry: AWS ECR
IAM / Service Account: ECS task roles for Fargate tasks

Why I chose this architecture

• ECS provides managed container orchestration
• ECR allows secure Docker image storage
• CloudWatch enables centralized logging
• Terraform ensures reproducible infrastructure

Pilot Cost-Awareness Notes

• Minimal ECS compute resources planned
• Short CloudWatch log retention (7 days)
• Lightweight SQLite storage
• No always-on heavy infrastructure

---

# 7) Cost Optimization Report (Mandatory)

[x] Monthly estimate included
[x] Assumptions documented
[x] Component-wise cost breakdown included

Cost Controls Implemented / Proposed

[x] Budgets
[x] Billing alerts
[x] Tags for cost tracking
[x] Log retention policy
[x] Non-prod shutdown strategy
[x] Teardown instructions

Common Cost Traps I accounted for

1. ECS tasks running continuously
2. Large CloudWatch log retention
3. Unused ECR images
4. Orphaned resources after tests
5. Over-provisioned compute resources
6. Excessive logging volume
7. Idle infrastructure
8. Forgotten development environments

---

# 8) Observability & Monitoring (Mandatory)

Logging

[x] Structured logs implemented
[x] Log level configurable
[x] Sample logs included

Metrics

[x] Request latency monitoring considered
[x] Error count / error rate monitoring
[x] Traffic volume / request count monitoring
[x] Health endpoint monitoring

Alerts

Alert #1: Service health check failure
Alert #2: High error rate threshold

Evidence

Monitoring configuration documented in docs/architecture.md

---

# 9) Security / Secrets / IAM (Mandatory)

Secrets

[x] No secrets committed to repo
[x] .env.example included
[x] Secrets management approach documented

IAM / Access Control

• ECS task roles planned with minimal permissions
• Least-privilege approach considered

Security Basics

• Environment variables used for configuration
• Container runtime isolation through Docker

---

# 10) Ops Runbook (Mandatory)

Runbook file path: docs/ops-runbook.md

Covered scenarios

[x] Service down / health checks failing
[x] Latency spike
[x] Sudden cost spike
[x] DB/storage issue
[x] Bad deployment / rollback
[x] Accidental public exposure / misconfiguration

---

# 11) IaC Validation / Reproducibility

Terraform

[x] terraform init works
[x] terraform validate works
[x] terraform plan works

Teardown

terraform destroy

---

# 12) Known Limitations / Trade-offs

1. SQLite is not suitable for large-scale production workloads
2. Infrastructure was validated but not fully deployed to AWS
3. Monitoring dashboards not fully implemented
4. CI pipeline does not push Docker images to ECR
5. Autoscaling configuration not implemented
6. Serverless is not suitable for high frequency workloads

---

# 13) AI Tool Usage Disclosure (Mandatory)

AI tools used

[x] ChatGPT

What I used AI for

• Creating the service
• DevOps architecture guidance
• Documentation structure
• Solving errors
• Verifying my solutions with known best practices

What I manually verified / tested

• Docker build and container execution
• API endpoints locally
• Terraform configuration validation
• GitHub Actions CI pipeline execution
