import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { key } from '../../app/tmdb';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Shake } from '@ionic-native/shake';
import { Observable } from 'rxjs/Observable';

export interface Result {
  original_title: string;
  release_date: number;
  poster_path: string;
  overview: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  private shakeSubscription: Subscription;
  listRes: Observable<Result[]> = null;
  query: string = '';
  showNoRes: boolean = true;
  pushPage: any = DetailsPage;

  constructor(public navCtrl: NavController, private http: HttpClient, private alertCtrl: AlertController, private shake: Shake) {

  }

  onImput():void{
    console.log(this.query);
    if(this.query == ''){
      this.listRes = null;
      this.showNoRes = true;
    }else{
      this.showNoRes = false;
      this.listRes = this.fetchResults();
    }
  }

  fetchResults():Observable<Result[]>{
    return this.http.get<Result[]>("https://api.themoviedb.org/3/search/movie", {
      params: new HttpParams().set('api_key', key).set('query', this.query)
    }).pluck("results");
  }

  private discoverMovies():Observable<Result[]> {
    return this.http.get<Result[]>("https://api.themoviedb.org/3/search/movie-discover", {
      params: new HttpParams().set('api_key', key).set('primary_release_year', this.query)
    }).pluck("results");
  }

  showRandomMovieAlert(movies:Result[]):void{
    var movie = movies[Math.floor(Math.random() * movies.length)];
    let alert = this.alertCtrl.create({
      title: movie.original_title,
      message: movie.overview,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(this.pushPage, {details:movie});
          }
        }
      ]
    });
    alert.present;
  }

  ionViewDidEnter():void{
    this.shakeSubscription = this.shake.startWatch().switchMap(() => this.discoverMovies()).subscribe(movies=>this.showRandomMovieAlert(movies));
  }

  ionViewWillLeave():void{
    this.shakeSubscription.unsubscribe();
  }
}
