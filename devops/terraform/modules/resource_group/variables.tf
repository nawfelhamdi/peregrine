

variable "resource_group_name" {
  description = "The name of the resource group"
}

variable "rg_prefix" {
  description = "The shortened abbreviation to represent your resource group that will go on the front of some resources."
}

variable "location" {
  description = "The location/region where the virtual network is created. Changing this forces a new resource to be created."
}

### TAGS ###
variable "tags" {
  type    = map(string)
}

