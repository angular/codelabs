import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute is a service that is used to get the current route information.
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'; // FormGroup is a class that is used to create a form group. FormControl is a class that is used to create a form control.


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Photo of the housing location">
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>
            Units Available: {{housingLocation?.availableUnits}}
          </li>
          <li>
            Does this location have wifi: {{housingLocation?.wifi}}
          </li>
          <li>
            Does this location have laundry: {{housingLocation?.laundry}}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply to live here!</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button class="primary">Apply Now</button>
    
    
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute); // inject is a function that is used to inject a dependency into a class.
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  // FormGroup is a class that is used to create a form group. FormControl is a class that is used to create a form control.
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id')); // making a service changes this from a this. to const that we can call locally.
    this.housingService.gethousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }


  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '', // nullish coalescing operator means if the value is null or undefined, use the value after the operator.
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }
}
