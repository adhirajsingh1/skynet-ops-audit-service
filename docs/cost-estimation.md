# Cost Estimation — Skynet Ops Audit Service

## Overview

This document estimates the monthly cost of running the Skynet Ops Audit Service on AWS while keeping the total infrastructure cost between **$25 and $75 per month**, as required by the assessment.

The architecture prioritizes **cost efficiency, simplicity, and operational reliability**.


# Expected Traffic

The expected system traffic is:

* **5,000 – 20,000 API requests per day**
* Peak traffic expected during working hours
* Low overnight traffic

This traffic level allows the service to run efficiently on **small compute resources**.


# Proposed AWS Infrastructure

The proposed infrastructure consists of:

* Amazon ECS Fargate (Container hosting)
* Application Load Balancer
* Amazon CloudWatch (Logging & monitoring)
* Minimal storage usage


# Monthly Cost Breakdown

## 1. ECS Fargate 

The containerized service runs on a small Fargate task.

Configuration:

* **0.25 vCPU**
* **0.5 GB RAM**
* Single running task

Estimated cost:

~ $12 – $18 / month

This provides sufficient capacity for the expected traffic.


## 2. Application Load Balancer

The ALB distributes incoming traffic to the container.

Estimated cost:

~ $16 – $20 / month

Cost depends on request count and data processing.


## 3. CloudWatch Logs

CloudWatch collects application and container logs.

Estimated cost:

~ $3 – $6 / month

Cost depends on log volume and retention period.


## 4. Data Storage

The service currently uses **SQLite**, which is embedded in the container.

Estimated cost:

~ $0 – $2 / month



# Estimated Total Monthly Cost

| Service                   | Estimated Cost |
| ------------------------- | -------------- |
| ECS Fargate               | $12 – $18      |
| Application Load Balancer | $16 – $20      |
| CloudWatch Logs           | $3 – $6        |
| Storage                   | $0 – $2        |

### Total Estimated Cost

$31 – $46 per month

This stays comfortably within the **$25–$75 budget constraint**.


# Cost Optimization Strategies

The system includes several cost optimization strategies:

### 1. Minimal Compute Resources

Using **0.25 vCPU tasks** reduces compute costs while still handling expected traffic.


### 2. Single Container Deployment

Only one container instance is used initially to minimize infrastructure expenses.


### 3. Efficient Logging

Log retention policies limit storage costs by automatically deleting old logs.


### 4. Lightweight Database

SQLite eliminates the need for a dedicated database service during early deployment.


### 5. Horizontal Scaling Only When Needed

Additional containers can be launched only when traffic increases.


# Future Cost Improvements

Additional cost reductions could include:

* Using **AWS Savings Plans**
* Implementing **auto-scaling**
* Reducing log retention period
* Switching to **serverless architectures (AWS Lambda)** for lower traffic environments


# Conclusion

The proposed infrastructure keeps monthly operational costs between **$31 and $46**, meeting the assessment requirement while providing reliable and scalable service delivery.
