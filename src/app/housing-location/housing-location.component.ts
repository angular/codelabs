import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}"> <!-- class section means it's a photo  for listing-photo -->
      <h2 class="listing-heading">{{ housingLocation.name }}</h2> <!-- class section means it's a heading for listing-heading -->
      <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }} </p> <!-- class section means it's a location for listing-location -->
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </section>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housingLocation!:HousingLocation; // this is the input decorator, it is used to pass data from the parent component to the child component.

}
