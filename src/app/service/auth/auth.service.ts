import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

export const ENDPOINT = 'http://172.21.215.221:8000/api/';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _loginURL = ENDPOINT + 'auth/login';
    private _loggedinURL = ENDPOINT + 'my/valid';
    private _signupURL = ENDPOINT + 'auth/register';

    public authGuard = '';
    constructor(private http: HttpClient) {}

    loginRequest(user: any) {
        return this.http.post<any>(this._loginURL, user);
    }

    signupRequest(user: any) {
        return this.http.post<any>(this._signupURL, user);
    }

    private loggedin = true;

    async isLoggedIn() {
        let token = sessionStorage.getItem('token');
        if (token == null) {
            return false;
        }

        let response = await firstValueFrom(
            this.http.get(this._loggedinURL, { observe: 'response' })
        ).catch((r) => {});

        if (response == null) {
            this.deleteToken();
            return false;
        }
        return response.status == 200;
    }

    isTutee() {
        return this.loggedin;
    }

    isTutor() {
        return this.loggedin;
    }
    getToken() {
        return sessionStorage.getItem('token');
    }

    deleteToken() {
        sessionStorage.removeItem('token');
    }
}
