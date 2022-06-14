
resource "azurerm_key_vault" "key_vault" {
  name                        = "${var.rg_prefix}${var.key_vault_name}"
  location                    = var.location
  resource_group_name         = var.resource_group

  tenant_id                   = var.tenant_id
  sku_name                    = var.key_vault_sku

  soft_delete_enabled         = false

  purge_protection_enabled    = false
  enabled_for_disk_encryption = var.enabled_for_disk_encryption
  enabled_for_deployment      = var.enabled_for_deployment
  enabled_for_template_deployment = var.enabled_for_template_deployment


  network_acls {
    default_action = "Allow"
    bypass         = "AzureServices"
  }

  tags = var.tags
}

resource "azurerm_key_vault_access_policy" "default_policy" {
  key_vault_id = azurerm_key_vault.key_vault.id
  tenant_id    = var.tenant_id
  object_id    = var.object_id

  lifecycle {
    create_before_destroy = true
  }

  key_permissions = var.kv-key-permissions-full
  secret_permissions = var.kv-secret-permissions-full
  certificate_permissions = var.kv-certificate-permissions-full
  storage_permissions = var.kv-storage-permissions-full
}

resource "azurerm_key_vault_access_policy" "policy" {
  for_each                = var.policies
  key_vault_id            = azurerm_key_vault.key_vault.id
  tenant_id               = lookup(each.value, "tenant_id")
  object_id               = lookup(each.value, "object_id")
  key_permissions         = lookup(each.value, "key_permissions")
  secret_permissions      = lookup(each.value, "secret_permissions")
  certificate_permissions = lookup(each.value, "certificate_permissions")
  storage_permissions     = lookup(each.value, "storage_permissions")
}

resource "azurerm_key_vault_secret" "secret" {
  for_each     = var.secrets
  key_vault_id = azurerm_key_vault.key_vault.id
  name         = each.key
  value        = lookup(each.value, "value")
  tags         = var.tags
  depends_on = [
    azurerm_key_vault.key_vault,
    azurerm_key_vault_access_policy.default_policy,
  ]
}
