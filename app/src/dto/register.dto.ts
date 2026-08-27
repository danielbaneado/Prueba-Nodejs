export interface RegisterDto {
  name: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  phone: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  captchaToken: string;
  captchaAnswer: number;
}
