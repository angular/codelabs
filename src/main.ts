import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

import { CipherComponent } from './cipher/cipher';
import { SecretMessageComponent } from './secret-message/secret-message';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'angular-cipher',
  standalone: true,
  imports: [CommonModule, CipherComponent, SecretMessageComponent],
  template: `
    <secret-message/>
    <cipher/>
  `,
})
export class App {}

bootstrapApplication(App, { providers: [provideNoopAnimations()] });
