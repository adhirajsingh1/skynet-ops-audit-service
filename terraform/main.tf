provider "aws" {
  region = "us-east-1"
}

# ECS Cluster for running containers
resource "aws_ecs_cluster" "skynet_cluster" {
  name = "skynet-audit-cluster"
}

# ECR repository to store Docker image
resource "aws_ecr_repository" "audit_service_repo" {
  name = "skynet-audit-service"
}

# CloudWatch log group for container logs
resource "aws_cloudwatch_log_group" "audit_logs" {
  name              = "/ecs/skynet-audit-service"
  retention_in_days = 7
}