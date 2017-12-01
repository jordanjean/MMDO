import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

interface searchResult {
  title: string;
  author: string;
  date: number;
  image: string;
}

const RESULTS: Array<searchResult> = [{
  title: "resultat1", author: "author1", date: 2017, image: '<img src="http://lorempixel.com/400/200" />'
}, {
  title: "resultat2", author: "author2", date: 2018, image: '<img src="http://lorempixel.com/400/200" />'
}];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  listRes: Array<searchResult> = [];
  query: string = '';
  showNoRes: boolean = true;
  constructor(public navCtrl: NavController) {

  }

  onImput():void{
    console.log(this.query);
    if(this.query == ''){
      this.listRes = [];
      this.showNoRes = true;
    }else{
      this.showNoRes = false;
      this.listRes = RESULTS;
    }
  }

}
