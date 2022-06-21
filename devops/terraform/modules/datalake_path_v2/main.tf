
resource "azurerm_storage_data_lake_gen2_path" "path" {
  path               = var.path
  filesystem_name    = var.filesystem_name
  storage_account_id = var.storage_account_id
  resource           = var.resource
}

