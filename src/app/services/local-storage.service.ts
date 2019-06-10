import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private tempStorage = {};

  CATALOGO = 'catalogo';

  getValue(key) {
    const encodedKey = window.btoa(`@@Catalogo:${key}`);
    let encodedValue;
    try {
      encodedValue = window.localStorage.getItem(encodedKey);
    } catch (e) {
      encodedValue = this.tempStorage[encodedKey];
    }
    const stringValue = encodedValue && window.atob(encodedValue);
    return stringValue && JSON.parse(stringValue);
  }


  setValue(key, value) {
    if (!value && value !== false) {
      return;
    }
    const encodedKey = window.btoa(`@@Catalogo:${key}`);
    const stringValue = JSON.stringify(value);
    const encodedValue = window.btoa(stringValue);
    try {
      window.localStorage.setItem(encodedKey, encodedValue);
    } catch (e) {
      this.tempStorage[encodedKey] = encodedValue;
    }
  }

}
