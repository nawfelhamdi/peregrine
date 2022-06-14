


//resource "azurerm_sql_database" "sql_database" {
//  name                = var.db_name
//  resource_group_name = var.resource_group
//  location = var.location
//  server_name = var.server_name
//
//}

resource "azurerm_mssql_database" "sql_database" {
  name           = var.db_name
  server_id      = var.server_id
  collation      = var.collation
//  license_type   = "LicenseIncluded"
  max_size_gb    = var.max_size_gb
//  read_scale     = true
  sku_name       = var.sku_name
//  zone_redundant = true

  tags = var.tags

}