import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../medicine.service';
import { Router } from '@angular/router';
import { Medicine } from '../models/medicine';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {

  constructor(private medicineService: MedicineService, private router: Router) { }

  medicine : Medicine;

  medicines : Medicine[] = [];

  ngOnInit() {
    this.loadMedicines();
    this.medicine = new Medicine();
  }

  loadMedicines() {
    this.medicineService.getAllMedicines().subscribe(
      response => {
         this.medicines = response;
        //alert(response);
      }
    );
  }

  addMedicine() : void
  {
    this.medicineService.addMedicine(this.medicine).subscribe(
      (response: any) =>
      {
        //alert(response);
        this.medicineService.formModel.reset();
        this.loadMedicines();
        this.medicine = new Medicine();
      }
    )
  }

  deleteMedicine(medicineId : number) : void
  {
    this.medicineService.deleteMedicine(medicineId).subscribe(
      (response: any) =>
      {
        this.loadMedicines();
      }
    )
  }

  editMedicine(medicine : Medicine) : void
  {
    this.medicineService.medicineForUpdate = medicine;
    this.router.navigate(['/medicine-update']);
  }


}
