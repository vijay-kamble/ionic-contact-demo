import { Contact } from './../contact-model';
import { Component, OnInit, Input } from '@angular/core';
import { ContactsProviderService } from 'src/app/service/contacts-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;
  @Input() id;
  constructor(private contactProvider: ContactsProviderService,
              private router: Router,
              private route: ActivatedRoute,
              private alertController: AlertController,
              private modalController: ModalController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.contact = this.contactProvider.getContact(this.id);
    console.log(this.contact);
  }
  deleteContact(id) {
    this.alertController.create({
      header: 'Delete Contact',
      message: 'Do you want to delete this contact?<br><h3>' + this.contact.firstName + ' ' + this.contact.lastName + '</h3>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (this.contactProvider.deleteContact(id)) {
              this.dismissModal();
              this.toastController.create({
                message: 'Contact Deleted Successfully!',
                duration: 3000
              }).then(toast => toast.present());
            }
          }
        }
      ]
    }).then(alert => alert.present());


  }

  async update() {

    const alert = await this.alertController.create({
      header: 'New Contact',
      inputs: [
        {
          name: 'firstName',
          type: 'text' as const,
          value: this.contact.firstName,
          placeholder: 'First Name'
        },
        {
          name: 'lastName',
          type: 'text' as const,
          value: this.contact.lastName,
          id: 'name2-id',
          placeholder: 'Last Name'
        },
        {
          name: 'phone',
          type: 'number' as const,
          value: this.contact.phone,
          placeholder: 'Phone Number'
        },
        {
          name: 'email',
          type: 'url' as const,
          value: this.contact.email,
          placeholder: 'Email'
        },
        {
          name: 'address',
          type: 'text' as const,
          value: this.contact.address,
          placeholder: 'Address'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.contactProvider.updateContact(data);
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
  dismissModal() {
    this.modalController.dismiss();
  }

}
