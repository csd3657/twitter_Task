import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  _data = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}


  fetchData() {
    this.http.get<any>('http://79.129.165.216:33334/api/search/tweets?q=ryanair').subscribe(data => {
      this._data = data;
      console.log(this._data);
    });
  }
}
