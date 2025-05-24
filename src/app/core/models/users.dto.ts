export enum UserRole {
  ADMIN,
  HEAD_TEACHER,
  TEACHER,
  STUDENT
}

export type User = {
  id: string;
  name: string;
  email: string;
  userRole: UserRole;
}

export type UserViewDto = {
  name: string;
  email: string;
}

export type HeadTutor = User;

export type HeadTutorViewDto = UserViewDto;

export type Tutor = User & {subject: string};

export type TutorViewDto = UserViewDto & {subject: string};

export type Student = User & {
  group: string;
}

export type StudentViewDto = UserViewDto & {
  group: string;
}

export type ParticipantViewDto = StudentViewDto | TutorViewDto;
