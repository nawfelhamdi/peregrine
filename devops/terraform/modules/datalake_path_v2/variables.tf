
variable "path" {
  description = "Path of the folder inside the filesystem."
}

variable "filesystem_name" {
  description = "Name of the filesystem"
}

variable "storage_account_id" {
  description = "Id of the storage account."
}


variable "resource" {
  description = "Type of resource being created."
  default = "directory"
}

