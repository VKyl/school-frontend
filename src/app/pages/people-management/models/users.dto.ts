export type User = {
  id: number;
  name: string;
  email: string;
}

export type UserViewDto = {
  name: string;
  email: string;
}

export type Tutor = User;

export type TutorViewDto = UserViewDto;

export type Student = User & {
  group: string;
}

export type StudentViewDto = UserViewDto & {
  group: string;
}

export type ParticipantViewDto = StudentViewDto | TutorViewDto;
