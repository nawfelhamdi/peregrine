
resource "azurerm_resource_group" "rg" {
  name     = "${var.rg_prefix}${var.resource_group_name}"
  location = var.location

  tags     = var.tags
}

