

output "key_vault_id" {
  value = azurerm_key_vault.key_vault.id
}

output "key_vault_name" {
  value = azurerm_key_vault.key_vault.name
}

output "key_vault_uri" {
  value = azurerm_key_vault.key_vault.vault_uri
}

//output "key_vault_secrets" {
//  value = values(azurerm_key_vault_secret.secret).*.value
//}
