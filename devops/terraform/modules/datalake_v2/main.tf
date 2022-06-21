

resource "azurerm_storage_account" "datalakev2" {
  name                     = "${var.rg_prefix}${var.storage_name}"
  resource_group_name      = var.resource_group
  location                 = var.location
  account_tier             = var.account_tier
  account_replication_type = var.account_replication_type
  account_kind             = "StorageV2"
  is_hns_enabled           = var.hierarchical

  tags = var.tags

}

