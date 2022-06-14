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

variable "filesystem1_name" {
  description = "Name for the first file system inside the storage account."
}

variable "filesystem2_name" {
  description = "Name for the second file system inside the storage account."
}

### TAGS ###
variable "tags" {
  type    = map(string)
}

