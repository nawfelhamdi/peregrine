export class CustomError {
  message!: string;
  status!: number;
  devModeMessage!: any;

  constructor(message: string, status: number = 500, devModeMessage: any = {}) {
    this.message = message;
    this.status = status;
    this.devModeMessage = devModeMessage
  }
}