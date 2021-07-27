import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Doctor } from './models/doctor';
import { FormBuilder, Validators } from "@angular/forms";

@Injectable()
export class DoctorService {

  private apiUrl = 'https://localhost:5001/api/doctor/';
  constructor(private formbuilder:FormBuilder,private http: HttpClient) { }

  public getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl + 'getAll');
  }

  public addDoctor(doctor : Doctor): Observable<Doctor> 
  {
    return this.http.post<Doctor>(this.apiUrl + 'add', doctor);
  }

  formModel = this.formbuilder.group({
    DoctorName: ['', Validators.required],
    Password : ['', [Validators.required, Validators.minLength(6)]],
  });

  public signIn(): Observable<Object>
  {
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    myheader.set('Connection', 'keep-alive');
    let body = new HttpParams();
    body = body.set('username', this.formModel.value.DoctorName);
    body = body.set('password', this.formModel.value.Password);

    localStorage.setItem("doctorName", this.formModel.value.DoctorName);

    return this.http.post(this.apiUrl + 'signIn', body, {headers: myheader});

  }

  public signOut(): Observable<Object>
  {
    return this.http.post(this.apiUrl + 'signOut', {});
  } 

}