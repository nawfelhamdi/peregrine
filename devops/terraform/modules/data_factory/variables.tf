variable "resource_group" {
  description = "The name of the resource group in which to create the virtual network."
}

variable "rg_prefix" {
  description = "The shortened abbreviation to represent your resource group that will go on the front of some resources."
}

variable "location" {
  description = "The location/region where the virtual network is created. Changing this forces a new resource to be created."
}

variable "data_factory_name" {
  description = "name of the data factory being deployed."
}

### TAGS ###
variable "tags" {
  type    = map(string)
}



