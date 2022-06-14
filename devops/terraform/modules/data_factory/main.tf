


resource "azurerm_data_factory" "data_factory" {
  name                = join("", [var.rg_prefix, var.data_factory_name])
  location            = var.location
  resource_group_name = var.resource_group

  identity {
    type = "SystemAssigned"
  }

  tags = var.tags

}

