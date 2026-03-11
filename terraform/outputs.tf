output "ecs_cluster_name" {
  value = aws_ecs_cluster.skynet_cluster.name
}

output "ecr_repository_url" {
  value = aws_ecr_repository.audit_repo.repository_url
}