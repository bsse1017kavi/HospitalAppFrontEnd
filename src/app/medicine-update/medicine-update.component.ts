import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../medicine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicine-update',
  templateUrl: './medicine-update.component.html',
  styleUrls: ['./medicine-update.component.css']
})
export class MedicineUpdateComponent implements OnInit {

  constructor(private medicineService: MedicineService, private router: Router) { }

  ngOnInit() {
  }

  updateMedicine()
  {
    this.medicineService.updateMedicine().subscribe(
      (response: any) =>
      {
        this.router.navigate(['/medicine']);
      }
    )
  }

}
