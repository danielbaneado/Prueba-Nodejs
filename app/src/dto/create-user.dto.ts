export interface CreateUserDto {
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
  role?: string;
}
