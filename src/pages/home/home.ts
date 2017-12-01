import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { key } from '../../app/tmdb';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

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
  listRes: Observable<Result[]> = null;
  query: string = '';
  showNoRes: boolean = true;
  pushPage: any = DetailsPage;

  constructor(public navCtrl: NavController, private http: HttpClient) {}

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
}
