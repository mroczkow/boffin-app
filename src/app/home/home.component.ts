import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { 
  onShowOffPage() {
    window.open("http://off-festival.pl", "_blank");
  }
}
