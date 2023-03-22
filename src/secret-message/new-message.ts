import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface MessageDialogData {
  sender: string;
  message: string;
}

@Component({
  selector: 'secret-message',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
  <h1 mat-dialog-title>Customize & Share</h1>
  <div mat-dialog-content class="dialog-field-wrapper">
    <mat-form-field appearance="fill">
      <mat-label>Sender</mat-label>
      <input matInput [(ngModel)]="data.sender">
    </mat-form-field>
    <mat-form-field appearance="fill">
      <mat-label>Message</mat-label>
      <input matInput #message maxlength="50" [(ngModel)]="data.message">
      <mat-hint align="end">{{message.value?.length || 0}}/50</mat-hint>
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onExit()">Exit</button>
    <button mat-button [mat-dialog-close]="{ message: data.message, sender: data.sender }" cdkFocusInitial>Create & Copy URL</button>
  </div>
  `,
  styles: [
    `
    .dialog-field-wrapper {
      display: inline-grid;
    }
  `,
  ],
})
export class NewMessageDialog {
  constructor(
    public dialogRef: MatDialogRef<NewMessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData
  ) {}

  onExit(): void {
    this.dialogRef.close();
  }
}
