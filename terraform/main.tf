provider "aws" {
  region = "us-east-1"
}

resource "aws_ecs_cluster" "audit_cluster" {
  name = "skynet-audit-cluster"
}

resource "aws_cloudwatch_log_group" "audit_logs" {
  name              = "/ecs/skynet-audit-service"
  retention_in_days = 7
}

resource "aws_security_group" "audit_service_sg" {
  name        = "audit-service-sg"
  description = "Allow HTTP traffic"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}