export interface CreateSchoolDto {
  name: string;
  headTeacherPib: string;
  headTeacherEmail: string;
}

export interface SchoolDto {
  id: number;
  name: string;
  headTeacherId: number;
  teachersIds: Set<number>;
  classesIds: Set<number>;
  subjectsIds: Set<number>;
}
