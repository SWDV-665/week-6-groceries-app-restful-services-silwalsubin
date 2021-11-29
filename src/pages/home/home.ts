import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";
  items = [];
  errorMessage: string;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public dataService: GroceriesServiceProvider,
    public inputDialogService: InputDialogServiceProvider,
    public socialSharingService: SocialSharing
  ) 
  {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems(){
    return this.dataService.getItems()
      .subscribe(
        items => this.items = items, 
        error => this.errorMessage = <any> error
      );
  }

  addItem() {
    this.inputDialogService.showPrompt();
  }

  removeItem(item, index) {
    const toast = this.toastCtrl.create({
      message: `Removing Item - ${item.name}...`,
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(item._id);
  }

  shareItem(item, index) {
    const toast = this.toastCtrl.create({
      message: `Sharing Item - ${item.name}...`,
      duration: 3000
    });
    toast.present();

    let message = `Grocery Item - Name : ${item.name} - Quantity: ${item.quantity}`;
    let subject = `Shared via Groceries app`;
    this.socialSharingService.share(message, subject).then(() => {
      console.log('Shared Successfully')
    }).catch((error) => {
      console.error(`Error While Sharing: `, error);
    })
  }

  editItem(item, index) {
    const toast = this.toastCtrl.create({
      message: `Editing Item - ${item.name}...`,
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }
}