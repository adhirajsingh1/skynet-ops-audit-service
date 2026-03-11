provider "aws" {
  region = "us-east-1"
}

# ECS Cluster
resource "aws_ecs_cluster" "skynet_cluster" {
  name = "skynet-audit-cluster"
}

# ECR Repository for Docker Image
resource "aws_ecr_repository" "audit_repo" {
  name = "skynet-audit-service"
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "audit_logs" {
  name              = "/ecs/skynet-audit-service"
  retention_in_days = 7
}

# Security Group
resource "aws_security_group" "audit_service_sg" {
  name        = "audit-service-sg"
  description = "Allow traffic to audit service"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}