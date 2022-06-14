
variable "resource_group" {
  description = "The name of the resource group in which to create the virtual network."
}

variable "rg_prefix" {
  description = "The shortened abbreviation to represent your resource group that will go on the front of some resources."
}

variable "server_name" {
  description = "The base name of the server"
}

variable "location" {
  description = "The location/region where the virtual network is created. Changing this forces a new resource to be created."
}

variable "dbadmin_username" {
  description = "DB administrator user name."
}

variable "dbadmin_password" {
  description = "DB administrator password (recommended to disable password auth)."
}

variable "firewall_rule_name" {
  description = "Firewall rule name"
  default = "firewallrule"
}

### TAGS ###
variable "tags" {
  type    = map(string)
}

