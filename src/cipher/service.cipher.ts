import { computed, Injectable, signal } from '@angular/core';
import { ALPHABET } from '../constants';

export interface CipherKey {
  key: string;
  value: string;
}

const keys = [...ALPHABET];
const values = [...ALPHABET];

@Injectable({
  providedIn: 'root',
})
export class CipherService {
  cipher = signal(this.createNewCipherKey());
  decodedCipher = signal<CipherKey[]>([]);

  alphabet = ALPHABET;
  unsolvedAlphabet = computed(() =>
    ALPHABET.filter(
      (letter) => !this.decodedCipher().find((guess) => guess.value === letter)
    )
  );

  createNewCipherKey(): CipherKey[] {
    values.sort(() => (Math.random() > 0.5 ? 1 : -1));

    let cipher = [];
    for (let index in keys) {
      cipher = [...cipher, { key: keys[index], value: values[index] }];
    }

    return cipher;
  }

  checkForMatch(key: string, value: string): boolean {
    for (var item of this.cipher()) {
      if (item.key === value && item.value === key) {
        return true;
      }
    }
    return false;
  }
}
