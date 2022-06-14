

resource "azurerm_sql_server" "sqlserver" {
  name                = join("", [var.rg_prefix, var.server_name])
  resource_group_name = var.resource_group
  location = var.location
  version = "12.0"
  administrator_login = var.dbadmin_username
  administrator_login_password = var.dbadmin_password

  tags = var.tags

}

resource "azurerm_sql_firewall_rule" "sqlserver_firewall" {
  name                = var.firewall_rule_name
  resource_group_name = var.resource_group

  server_name         = azurerm_sql_server.sqlserver.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"

}
