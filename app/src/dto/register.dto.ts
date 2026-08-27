/**
 * DTO - Registro de Usuario
 */

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
  acceptsDataProcessing: boolean;
  acceptsTerms: boolean;
  acceptsNotifications: boolean;
  captchaToken: string;
  captchaAnswer: number;
}
