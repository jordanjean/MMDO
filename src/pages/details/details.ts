import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { searchResult } from '../home/home';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

    res: searchResult;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.res = this.navParams.get("details");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
