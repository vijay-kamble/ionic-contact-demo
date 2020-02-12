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
    if (this.contactProvider.deleteContact(id)) {
      this.dismissModal();
      this.toastController.create({
        message: 'Contact Deleted Successfully!',
        duration: 3000
      }).then(toast => toast.present());
    }
  }
  dismissModal() {
    this.modalController.dismiss();
  }

}
