import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserLoginDto, UserRegistrationDto} from './models/constants';

export interface TeacherResponseDto {
  id: number,
  pib: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})

export class TeacherService {
  private readonly http = inject(HttpClient);

  create(view: UserRegistrationDto, schoolId: number) {
    return this.http.put<number>(`${environment.apiUrl}/api/school/${schoolId}/add/teacher`, view, {
      withCredentials: true
    });
  }

  getListOfTeachers() {
    return this.http.get<UserLoginDto[]>(`${environment.apiUrl}/api/school/my_school_teachers`, {
      withCredentials: true
    });
  }

}
