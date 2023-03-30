import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/main/environments/environment';
import { ITodo } from '../interfaces/itodo';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url!: string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  get() {
    return this.http.get(this.url);
  }

  post(body: ITodo) {
    return this.http.post(this.url, body);
  }

  put(id: number, body: ITodo) {
    const url = this.url + `/${id}`;
    return this.http.put(url, body);
  }

  delete(id: number) {
    const url = this.url + `/${id}`;
    return this.http.delete(url);
  }
}
