import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit} from '@angular/core';
import * as uuid from 'uuid';
import * as contactsArray from '../../assets/static/contacts.json';
import { Contact } from '../contacts/contact-model';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';
import { EventEmitter } from 'events';
@Injectable({
  providedIn: 'root'
})
export class ContactsProviderService {
  contacts: Contact[] = this.sortAscending(contactsArray.default);
  cData = new Subject();
  
  constructor(private http: HttpClient,
              private storage: Storage,
  ) {

  }
  public getAllContacts() {
    return this.contacts;
  }
  public getContact(id: string) {
    const c: Contact = this.contacts.filter(contact => contact.id === id)[0];
    return c ? c : null;
  }
  public deleteContact(id: string) {
    this.contacts = this.contacts.filter(contact => contact.id != id);
    console.log('aftert deleting', this.contacts);
    this.cData.next(this.contacts);
    return true;
  }
  public addContact(contact: any) {
    
    contact.image = 'https://loremflickr.com/320/240/man?random=' + this.contacts.length;
    contact.index = this.contacts.length;
    contact.id = uuid.v4().toString();
    this.contacts.push(contact);
    this.cData.next(this.contacts);
  }

  public updateContact(contact: Contact) {
    console.log(this.sortAscending(this.contacts));
    this.cData.next(this.contacts);
  }

  public sortAscending(data?: Contact[]) {
    this.contacts = data.sort((a, b) => {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) { return -1; } else { return 1; }
    });
    return this.contacts;
  }
  // private saveToLocal(contacts: Contact[]) {
  //   console.log('saved to localStorage');
  //   this.storage.set('cArray', JSON.stringify(contacts));
  // }
  // public getFromLocal() {
  //   this.storage.get('cArray').then((val) => {
  //     return JSON.parse(val);
  //   });
  // }
}
