

output "storage_id" {
  value = azurerm_storage_account.datalakev2.id
}

output "storage_name" {
  value = azurerm_storage_account.datalakev2.name
}

output "storage_blob_endpoint" {
  value = azurerm_storage_account.datalakev2.primary_blob_endpoint
}

output "storage_primary_access_key" {
  value = azurerm_storage_account.datalakev2.primary_access_key
}

output "storage_filesystem1_id" {
  value = azurerm_storage_data_lake_gen2_filesystem.filesystemv2_1.id
}

output "storage_filesystem1_name" {
  value = azurerm_storage_data_lake_gen2_filesystem.filesystemv2_1.name
}

output "storage_filesystem2_id" {
  value = azurerm_storage_data_lake_gen2_filesystem.filesystemv2_2.id
}

output "storage_filesystem2_name" {
  value = azurerm_storage_data_lake_gen2_filesystem.filesystemv2_2.name
}
