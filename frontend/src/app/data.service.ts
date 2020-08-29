import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  _data = [];
  followers_number = 0;
  friends_number = 0;
  search_token: String = "ryanair";
  constructor(private http: HttpClient) { }

  ngOnInit(): void {}


  fetchData() {
    this.http.get<any>('http://79.129.165.216:33334/api/search/tweets?q=' + this.search_token).subscribe(data => {
      this._data = data;
      console.log(this._data);
    });
  }

}
