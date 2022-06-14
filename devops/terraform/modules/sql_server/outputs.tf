
output "sqlserver_id" {
  value = azurerm_sql_server.sqlserver.id
}

output "sqlserver_name" {
  value = azurerm_sql_server.sqlserver.name
}

output "sqlserver_domain_name" {
  value = azurerm_sql_server.sqlserver.fully_qualified_domain_name
}
