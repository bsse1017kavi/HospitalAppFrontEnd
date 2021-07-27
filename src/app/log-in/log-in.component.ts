import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  isLoggedin : boolean;

  constructor(public service: DoctorService, public router: Router) { }

  ngOnInit() {
  }

  signIn() : void
  {
    this.service.signIn().subscribe(
      (response : any) =>
      {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.isLoggedin = true;
        this.service.formModel.reset();
        this.router.navigate(["/patient"]);

      }, err =>
      {
        this.isLoggedin = false;
      }
    )
  }

}
