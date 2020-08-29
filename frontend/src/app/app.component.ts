import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'twitter-app';
  searching_item: String = "";
  followers_number = 0;
  friends_number = 0;
  constructor(private DataService: DataService) { }

  ngOnInit() {
    this.DataService.fetchData();
  }

  Search(){
    this.DataService.search_token = this.searching_item;
    this.DataService.fetchData();
    this.getFollowersCount();
  }

  getFollowersCount(){
    this.DataService.followers_number = 0;
    this.DataService.friends_number = 0;

    for (let i = 0; i < this.DataService._data['mentions'].length; i++) {
      this.DataService.followers_number += this.DataService._data['mentions'][i].followers_count;
      this.DataService.friends_number += this.DataService._data['mentions'][i].friends_count;
      console.log(i, this.DataService._data['mentions'][i].followers_count);
    }

    this.followers_number = this.DataService.followers_number;
    this.friends_number = this.DataService.friends_number;
  }
}
