import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Medicine } from './models/medicine';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MedicineService {

  private apiUrl = 'https://localhost:5001/api/medicine/';
  constructor(private formbuilder:FormBuilder,private http: HttpClient) { }

  medicineForUpdate : Medicine = new Medicine();

  public getAllMedicines(): Observable<Medicine[]> {
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    myheader.set('Connection', 'keep-alive');
    return this.http.get<Medicine[]>(this.apiUrl + 'getAll');
  }

  public addMedicine(medicine : Medicine): Observable<Medicine> 
  {
    return this.http.post<Medicine>(this.apiUrl + 'add', medicine);
  }

  public deleteMedicine(medicineId : number): Observable<Object>
  {
    return this.http.get(this.apiUrl + 'delete?medicineId=' + medicineId);
  }

  public updateMedicine(): Observable<Medicine>
  {
    var updatedMedicine =  this.http.post<Medicine>(this.apiUrl + 'update', this.medicineForUpdate);
    this.medicineForUpdate = new Medicine();
    return updatedMedicine;
  }

  formModel = this.formbuilder.group({
    MedicineName: ['', Validators.required],
    Indication : ['', [Validators.required]],
    Usage : ['', [Validators.required]],
    Instruction : ['', [Validators.required]]
  });

}
