
variable "resource_group" {
  description = "The name of the resource group in which to create the virtual network."
}

variable "location" {
  description = "The location/region where the virtual network is created. Changing this forces a new resource to be created."
}

variable "server_id" {
  description = "Id of the host server for the database"
}

variable "db_name" {
  description = "Database name."
}

variable "collation" {
  description = "Specifies the collation of the database."
  default = "SQL_Latin1_General_CP1_CI_AS"
}

variable "max_size_gb" {
  description = "The max size of the database in gigabytes."
  default = 300
}

variable "sku_name" {
  description = "Specifies the name of the sku used by the database. Default is General purpose GP_Gen5_2"
  default = "GP_Gen5_2"
}

### TAGS ###
variable "tags" {
  type    = map(string)
}
