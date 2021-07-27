import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Patient } from './models/patient';
import { Medicine } from './models/medicine';

@Injectable()
export class PatientService {

  private apiUrl = 'https://localhost:5001/api/patient/';
  constructor(private formbuilder:FormBuilder,private http: HttpClient) { }

  patientForUpdate : Patient = new Patient();

  patientForPrescription : Patient = new Patient();

  public getAllPatients(): Observable<Patient[]> {
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    myheader.set('Connection', 'keep-alive');
    return this.http.get<Patient[]>(this.apiUrl + 'getAll');
  }

  public addPatient(patient : Patient): Observable<Patient> 
  {
    return this.http.post<Patient>(this.apiUrl + 'add', patient);
  }

  public deletePatient(patientId : number): Observable<Object>
  {
    //const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //myheader.set('Connection', 'keep-alive');
    //let body = new HttpParams();
    //body = body.set('patientId', patientId.toString());

    return this.http.get(this.apiUrl + 'delete?patientId=' + patientId);
  }

  public updatePatient(): Observable<Patient>
  {
    var updatedPatient =  this.http.post<Patient>(this.apiUrl + 'update', this.patientForUpdate);
    this.patientForUpdate = new Patient();
    return updatedPatient;
  }

  public getMedicines(patientId : number) : Observable<Medicine[]>
  {
    let x = this.http.get<Medicine[]>(this.apiUrl + 'getMedicines?patientId=' + patientId);
    //console.log("Here is problem " + x.first);
    return x;
  }

  public addPatientMedicineRelation(patientId: number, medicineId: number) : Observable<Object>
  {
    return this.http.post("https://localhost:5001/api/prescription/add", {"patientId": patientId, "medicineId": medicineId});
  }

  public deletePatientMedicineRelation(patientId: number, medicineId: number) : Observable<Object>
  {
    return this.http.get("https://localhost:5001/api/prescription/delete?patientId=" + patientId + "&medicineId=" + medicineId);
  }

  formModel = this.formbuilder.group({
    PatientName: ['', Validators.required],
    Age : ['', [Validators.required]],
    Diagnosis : ['', [Validators.required]]
  });

}
