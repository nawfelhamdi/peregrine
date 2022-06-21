

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


