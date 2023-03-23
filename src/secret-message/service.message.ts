import { computed, Injectable, signal } from '@angular/core';
import { CipherKey, CipherService } from '../cipher/service.cipher';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  superSecretMessage = 'Angular Signals are in developer preview in v16 today!';

  secretMessage = computed(() =>
    this.translateMessage(this.superSecretMessage, this.cipher.cipher())
  );
  // TODO(2): Define your first computed()
  solvedMessage = this.translateMessage(
    this.secretMessage(),
    this.cipher.decodedCipher()
  );

  constructor(private cipher: CipherService) {}

  translateMessage(code: string, ciph: CipherKey[]): string {
    let encoded = '';

    code.split('').forEach((char) => {
      let isUpperCase = false;
      if (char == char.toUpperCase()) {
        isUpperCase = true;
      }

      let value = ciph.find((el) => el.key === char.toLowerCase())?.value;
      let newChar = value ? value : char;

      encoded += isUpperCase ? newChar.toUpperCase() : newChar;
    });
    return encoded;
  }
}
