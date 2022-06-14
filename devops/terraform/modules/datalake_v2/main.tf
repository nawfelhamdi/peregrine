

resource "azurerm_storage_account" "datalakev2" {
  name                     = "${var.rg_prefix}${var.storage_name}"
  resource_group_name      = var.resource_group
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
  is_hns_enabled           = var.hierarchical

  tags = var.tags

}

resource "azurerm_storage_data_lake_gen2_filesystem" "filesystemv2_1" {
  name               = var.filesystem1_name
  storage_account_id = azurerm_storage_account.datalakev2.id
}

resource "azurerm_storage_data_lake_gen2_filesystem" "filesystemv2_2" {
  name               = var.filesystem2_name
  storage_account_id = azurerm_storage_account.datalakev2.id
}
