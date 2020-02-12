import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ContactsProviderService } from 'src/app/service/contacts-provider.service';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { Contact } from './contact-model';
type alertInput = 'number' | 'search' | 'password' | 'time' | 'text' | 'tel' | 'url' | 'email' | 'date' | 'checkbox' | 'radio';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit, OnDestroy {
  contacts: Contact[];
  addBtnActive = false;
  subscription: Subscription;
  constructor(private contactProvider: ContactsProviderService,
              private alertController: AlertController,
              private modalController: ModalController,
              private toastController: ToastController) {

  }

  ngOnInit() {
    this.contacts = this.contactProvider.getAllContacts();

    this.subscription =  this.contactProvider.cData.subscribe((data: []) => {
      this.contacts = data;
      console.log(data);
    });
  }

  async openDetails(id) {
    const modal = await this.modalController.create({
      component: ContactDetailsComponent,
      componentProps: {id}
    });
    return await modal.present();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async openAddContact() {
    this.addBtnActive = true;
    const alert = await this.alertController.create({
      header: 'New Contact',
      inputs: [
        {
          name: 'firstName',
          type: 'text' as const,
          placeholder: 'First Name'
        },
        {
          name: 'lastName',
          type: 'text' as const,
          id: 'name2-id',
          placeholder: 'Last Name'
        },
        {
          name: 'phone',
          type: 'number' as const,
          placeholder: 'Phone Number'
        },
        {
          name: 'email',
          type: 'url' as const,
          placeholder: 'Email'
        },
        {
          name: 'address',
          type: 'text' as const,
          placeholder: 'Address'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.addBtnActive = false;
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.contactProvider.addContact(data);
            this.toastController.create({
              message: ' Contact Added Successfully!',
              duration: 3000
            }).then(toast => toast.present());
          }
        }
      ]

    });
    return await alert.present();
  }

}
