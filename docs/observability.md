# Observability Strategy

## Overview

Observability ensures that the Skynet Ops Audit Service can be monitored, troubleshot, and maintained effectively in production.

The observability approach for this service focuses on three key pillars:

* Logging
* Metrics
* Health checks

---

## Logging

The service outputs logs to **standard output (stdout)**.

Example log:

```
skynet-ops-audit-service running on port 3000
```

When deployed in the cloud, these logs are collected by **AWS CloudWatch Logs**.

This allows operators to:

* inspect application behavior
* debug errors
* track request activity

---

## Metrics

Basic operational metrics include:

* number of requests
* error rate
* response latency
* container CPU usage
* container memory usage

These metrics help identify performance issues or abnormal system behavior.

In a cloud deployment, these metrics can be monitored using **AWS CloudWatch**.

---

## Health Checks

The service provides a health check endpoint:

```
GET /health
```

Example response:

```
{
  "status": "ok"
}
```

This endpoint can be used by:

* load balancers
* monitoring systems
* uptime checks

to verify that the service is running correctly.

---

## Alerting

Alerts can be configured based on key conditions such as:

* service health check failure
* high error rate
* container restarts
* high CPU or memory usage

Monitoring systems can trigger alerts to notify operators when these thresholds are exceeded.

---

## Benefits

This observability setup enables operators to:

* detect failures quickly
* monitor system performance
* troubleshoot issues efficiently
