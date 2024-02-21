import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';  
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service'; // this is the service that is used to get the housing locations.

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form action="">
        <input type="text" placeholder="Filter by City" #filter> 
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation"></app-housing-location> 
    </section>
    
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = []; // this is an array of housing locations.
  housingService: HousingService = inject(HousingService); // inject is a function that is used to inject a dependency into a class.
  filteredLocationList: HousingLocation[] = []; // this is an array of housing locations that are filtered.

  constructor() {
   this.housingService.getallHousingLocations().then((housingLocationList: HousingLocation[]) => {
    this.housingLocationList = housingLocationList;
    this.filteredLocationList = housingLocationList;
   });
}


filterResults(text: string) {
  if (!text) this.filteredLocationList = this.housingLocationList;

  this.filteredLocationList = this.housingLocationList.filter(
    housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
  );
}

}
