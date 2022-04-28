import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getUsersList():Observable<any> {
    return this.httpClient.get(this.url);
  }

  getUsersById(id:string):Observable<any> {
    return this.httpClient.get(`${this.url}?id=${id}`);
  }
}
