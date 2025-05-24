export enum UserRole {
  ADMIN = 'ADMIN',
  HEAD_TEACHER = 'HEAD_TEACHER',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export interface UserRegistrationDto {
  email: string;
  pib: string;
  role: UserRole;
}

export interface UserLoginDto {
  username: string;
  email: string;
}

export interface LoginResponse {
  id: number;
  role: UserRole;
}
