# Operations Runbook — Skynet Ops Audit Service

## Overview

This runbook provides operational guidance for running, monitoring, and troubleshooting the **Skynet Ops Audit Service**.

The goal is to ensure that operators can quickly diagnose and resolve service issues.

---

# Service Information

Service Name: **skynet-ops-audit-service**

Main API Endpoints:

GET `/health` — Service health check
POST `/events` — Store audit events
GET `/events` — Retrieve stored events

Default Port:

```
3000
```

---

# Starting the Service

### Local Development

Run the service using:

```
npm run dev
```

---

### Using Docker

Build the container:

```
docker build -t skynet-audit-service -f docker/Dockerfile .
```

Run the container:

```
docker run -p 3000:3000 skynet-audit-service
```

---

### Using Docker Compose

Start the service:

```
docker-compose up --build
```

Stop the service:

```
docker-compose down
```

---

# Health Check

Check service health:

```
GET http://localhost:3000/health
```

Expected response:

```
{
  "status": "ok"
}
```

If the service does not return **status: ok**, investigate logs.

---

# Common Issues and Troubleshooting

## 1. Service Not Starting

Possible causes:

* Port already in use
* Missing dependencies
* Incorrect environment variables

Resolution:

Check running processes:

```
lsof -i :3000
```

Stop conflicting services and restart the container.

---

## 2. High Error Rate

Symptoms:

* Frequent 500 responses
* Failed event storage

Resolution steps:

1. Check application logs
2. Verify database file permissions
3. Restart the container

---

## 3. High Response Latency

Possible causes:

* High request load
* Database contention

Resolution:

* Monitor container CPU usage
* Scale the service by running multiple containers
* Consider migrating to a managed database

---

# Log Monitoring

Application logs are printed to stdout.

Example log output:

```
skynet-ops-audit-service running on port 3000
```

In production, logs are forwarded to **CloudWatch Logs**.

---

# Restart Procedure

Restart container:

```
docker restart <container_id>
```

Restart using Docker Compose:

```
docker-compose restart
```

---

# Scaling the Service

Scaling can be achieved by running additional containers behind a load balancer.

Example:

```
docker-compose up --scale audit-service=2
```

---

# Backup Strategy

The SQLite database file should be periodically backed up.

Example backup command:

```
cp events.db backup-events.db
```

Automated backups should be configured in production.

---

# Alert Response

Recommended alert conditions:

* Service health check failing
* Error rate above threshold
* Container crash or restart loops

Operational response:

1. Investigate logs
2. Restart service if necessary
3. Escalate if issue persists
