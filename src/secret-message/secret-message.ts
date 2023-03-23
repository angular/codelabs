import { Component, OnInit } from '@angular/core';
import { CommonModule, PlatformLocation } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogData, NewMessageDialog } from './new-message';
import { MatButtonModule } from '@angular/material/button';
import { MessageService } from './service.message';
import { Clipboard } from '@angular/cdk/clipboard';
import { CipherService } from '../cipher/service.cipher';

@Component({
  selector: 'secret-message',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  // TODO(1): Define your first signal()
  // TODO(2): Define your first computed()
  template: `
  <div class="screen">
    <div class="message">
      <h4>Decipher a secret message from {{ this.sender }}:</h4>
      <h1>
        <span *ngFor="let char of this.messages.solvedMessage.split(''); index as i;" [class.unsolved]="this.messages.solvedMessage[i] !== this.messages.superSecretMessage[i]" >{{ char }}</span>
      </h1>
    </div>
    <button class="new-message-button" (click)="openDialog()">Customize</button>
  </div>
  `,
  styles: [
    `
    .screen {
      border-radius: 3% 3% 20% 20%/3% 3% 6.5% 6.5%;
      background: #0d0d0d;
      position: relative;
      height: 47%;
      aspect-ratio: 10/9;
      margin: auto;
      transform: translateY(10%);
      box-shadow: inset 1px 2px 3px -1px #fff9, 0 1px 5px -1px #00000080;
    }

    .message {
      color: #000;
      overflow: hidden;
      height: 78%;
      aspect-ratio: 1/1;
      background: #efefef;
      margin: auto;
      transform: translateY(10%);

      font-family: "Martian Mono", Helvetica,sans-serif;
    }

    .message::before {
      z-index: 2;
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-image: linear-gradient(transparent 0%,transparent calc(100% - 1px),#000 calc(100% - 2px),#000 100%),linear-gradient(90deg,transparent 0%,transparent calc(100% - 1px),#000 calc(100% - 2px),#000 100%);
      background-size: 7px 7px;
      opacity: .13;
    }

    .message::after {
      z-index: 3;
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(15,130,55,.4);
      -webkit-backdrop-filter: blur(.67px);
      backdrop-filter: blur(0.67px);
      box-shadow: inset 0 0 20px 4px #0000008f;
    }

    h1, h4 {
      text-align: center;

      margin: 0;
      padding: .25em  1em;
    }

    h1 {
      font-size: clamp(16px, 6vw, 35px);
      font-weight: 600;
      letter-spacing: .06rem;
      color: black;
      text-shadow: 1px 1px blue, 2px 2px 0 cyan, -1px -1px 0 red, -2px -2px 0 yellow;
      overflow-wrap: break-word;
    }

    .unsolved {
      color: grey;
      text-shadow: none;
    }

    h4 {
      font-size: clamp(10px, 4vw, 20px);
      font-style: italic;
      
      color: black;
      text-shadow: 0 0 2px #fff;

      margin-top: 1em;
    }

    .new-message-button {
      font-family: "Martian Mono", sans-serif;
      font-size: clamp(10px, 3vw, 20px);

      // color: #c0e0c7;
      text-shadow: -1px -1px 1.2px rgb(255 255 255 / 50%), 1px 1px 1px rgb(1 1 1 / 7%);
      background: transparent;

      position: absolute;
      bottom: 5%;
      right: 15%;

      border-radius: 10%;

    }
  `,
  ],
})
export class SecretMessageComponent implements OnInit {
  sender = 'the Angular Team';
  senderHref = 'sender=';

  constructor(
    public dialog: MatDialog,
    public messages: MessageService,
    public cipher: CipherService,
    private platformLocation: PlatformLocation,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    let url = this.platformLocation.hash.substring(1);
    if (url.length > 0) {
      let decoded: MessageDialogData = JSON.parse(atob(url));
      // TODO(1): Define your first signal()
      this.messages.superSecretMessage = decoded.message;
      this.sender = decoded.sender;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewMessageDialog, {
      data: { sender: this.sender, message: 'I love signals!' },
    });

    dialogRef.afterClosed().subscribe((result: MessageDialogData) => {
      let message = result.message;
      let sender = result.sender;

      let encoded = btoa(JSON.stringify(result));

      if (message != undefined && message.length > 0) {
        this.platformLocation.pushState('test', 'test', '#' + encoded);
        // TODO(1): Define your first signal()
        this.messages.superSecretMessage = message;
      }

      if (sender != undefined && sender.length > 0) {
        this.sender = sender;
      }

      this.cipher.cipher.set(this.cipher.createNewCipherKey());
      this.cipher.decodedCipher.set([]);

      let url = this.platformLocation.href;
      this.clipboard.copy(url);
    });
  }
}
