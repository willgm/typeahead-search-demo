import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myInput = new FormControl;
  results = Observable.of([])
    .merge(this.myInput.valueChanges)
    .filter(v => v.length > 1)
    .debounceTime(300)
    .map(v => `https://swapi.co/api/people/?search=${v}`)
    .switchMap(url => this.http.get(url))
    .map(json => json['results']);

  constructor(private http: HttpClient) {}
}
