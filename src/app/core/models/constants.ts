export enum UserRole {
  ADMIN,
  HEAD_TEACHER,
  TEACHER,
  STUDENT
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
