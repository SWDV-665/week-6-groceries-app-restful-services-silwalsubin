import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../groceries-service/groceries-service';
/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(
    public alertCtrl: AlertController,
    public dataService: GroceriesServiceProvider
  ) 
  {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      title: item ? 'Edit Item' : 'Add Item',
      message: item? 'Please edit item...' : 'Please add item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item? item.name: null,
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item? item.quantity: null,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (item !== undefined){
              item.name = data.name;
              item.quantity = data.quantity;
              this.dataService.editItem(item);
            } else {
              this.dataService.addItem(data);
            }
          }
        }
      ]
    });

    prompt.present();
  }

}