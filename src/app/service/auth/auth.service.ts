import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _loginURL = 'http://172.21.215.221:8000/api/auth/login';

    constructor(private http: HttpClient) {}

    loginRequest(user: any) {
        return this.http.post<any>(this._loginURL, user);
    }
}
