Overview

The Skynet Ops Audit Service is a lightweight event logging API designed to collect and retrieve operational events from different tenants. The system is built with a focus on simplicity, cost efficiency, observability, and operational reliability.

The service exposes REST APIs to store audit events and retrieve them with filtering capabilities.

High Level Architecture

Client Applications send requests to the API service which is deployed inside a containerized environment. The service processes requests, stores events in a lightweight database, and sends logs and metrics to monitoring systems.

Client → API Gateway → Containerized Audit Service → SQLite Storage
                               ↓
                         CloudWatch Logs
                               ↓
                         Monitoring Alerts

Core Components

1. API Service

The audit service is implemented using Node.js with Express.
It exposes the following endpoints:

GET /health – service health check

POST /events – store audit events

GET /events – retrieve stored events with filters

The application runs inside a Docker container to ensure consistent deployment across environments.

2. Containerization

The application is packaged as a Docker image and orchestrated using Docker Compose for local development.

Benefits:

Environment consistency

Easy deployment

Simplified scaling

3. Data Storage

For this assessment, the service uses SQLite as a lightweight embedded database.

Reasons for this choice:

Minimal operational overhead

No additional infrastructure cost

Suitable for low-to-moderate traffic workloads

Easy local testing

In production environments, this could be replaced with Amazon RDS or DynamoDB.

4. Cloud Deployment Plan (AWS)

The service can be deployed on AWS using a cost-efficient architecture:

Internet
   ↓
Application Load Balancer
   ↓
ECS Fargate Container
   ↓
CloudWatch Logs

Components:

Application Load Balancer

Routes incoming HTTP traffic

Enables scaling

ECS Fargate

Runs the Docker container

No server management required

CloudWatch

Centralized logging

Metrics monitoring

Alerting

5. Observability

Monitoring and observability are implemented through:

Structured application logs

Container logs forwarded to CloudWatch

Metrics such as request count, latency, and error rate

Alerting rules for high error rate or service downtime

6. Security Considerations

Basic security practices include:

Environment variables for configuration

No secrets stored in source code

Container isolation

Network access controlled via security groups

Future improvements may include:

API authentication

AWS Secrets Manager

WAF protection

- Scalability Strategy

The system is designed to scale horizontally by:

Running multiple container instances

Using load balancing

Moving storage to managed database services

- Reliability Strategy

To maintain reliability:

Health check endpoint for container monitoring

Automatic container restart policies

Logging and alerting for failures

- Future Improvements

Potential enhancements include:

Managed database (RDS or DynamoDB)

CI/CD pipeline for automated deployments

Distributed tracing

Rate limiting and authentication