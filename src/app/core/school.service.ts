import {inject, Injectable} from '@angular/core';
import {first} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {CreateSchoolDto, SchoolDto} from '../pages/people-management/head-tutors/models/constants';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private readonly http = inject(HttpClient);

  create(view: CreateSchoolDto) {
    return this.http.post<number>(`${environment.apiUrl}/api/school`, view, {
      withCredentials: true
    });
  }

  getListOfSchools() {
    return this.http.get<SchoolDto[]>(`${environment.apiUrl}/api/school`, {
      withCredentials: true
    });
  }

}
