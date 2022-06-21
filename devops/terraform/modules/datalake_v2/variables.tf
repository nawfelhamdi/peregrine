variable "resource_group" {
  description = "The name of the resource group in which to create the virtual network."
}

variable "rg_prefix" {
  description = "The shortened abbreviation to represent your resource group that will go on the front of some resources."
}

variable "location" {
  description = "The location/region where the virtual network is created. Changing this forces a new resource to be created."
}

variable "storage_name" {
  description = "Storage account name."
}

variable "hierarchical" {
  description = "Define if the hierarchical namespace is available or not"
  default = "true"
}

variable "account_tier" {
  description = "Tier for the storage account."
  default = "Standard"
}

variable "account_replication_type" {
  description = "Type of replication for the storage account."
  default = "LRS"
}

### TAGS ###
variable "tags" {
  type    = map(string)
}

