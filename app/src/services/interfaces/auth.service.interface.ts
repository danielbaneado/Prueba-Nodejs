import { RegisterDto } from '../../dto/register.dto';

export interface IAuthService {
  getCaptcha(): Promise<{ token: string; question: string }>;
  register(dto: RegisterDto): Promise<{ message: string; userId: number }>;
  activateAccount(token: string): Promise<{ message: string }>;
}
