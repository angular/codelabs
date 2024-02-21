import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';


@Injectable({
  providedIn: 'root' // root means that the service is provided to all the components in the application.
})
export class HousingService {
  url = 'http://localhost:3000/locations';

  
  constructor() { }

  async getallHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url); // fetch the data from the url
    return await data.json() ?? []; // return the data in json format    
  }

  async gethousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }


  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application submitted for ${firstName} ${lastName} at ${email}!`);
  }
}
