import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit, OnDestroy {

  constructor(public router: Router, public service: DoctorService) { }

  ngOnInit() {
    localStorage.setItem("loggedIn", "false");
  }

  check(): boolean
  {
    const token : string = localStorage.getItem("jwt");

    if(token)
    {
      return true;
    }

    else return false;
  }

  signOut():void
  {
    localStorage.removeItem("jwt");

    localStorage.removeItem("doctorName");

    this.router.navigate(["/home"]) ;
      
  }

  ngOnDestroy()
  {
    localStorage.removeItem("jwt");
  }

}
