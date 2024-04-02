import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-card',
    templateUrl: './auth-card.component.html',
    styleUrl: './auth-card.component.scss',
})
export class AuthCardComponent implements OnInit {
    @Input() public model: any;

    value: any = {};
    rowCount: string = '';
    margin: string = '';

    constructor(private _auth: AuthService, private _router: Router) { }

    ngOnInit() {
        if (this.model.isRegister) {
            this.margin = 'my-6';
        } else {
            this.margin = 'my-20';
        }
    }

    loginUser() {
        console.log(this.value);
        this._auth.loginRequest(this.value).subscribe({
            next: (res) => {
                console.log(res);
                this._router.navigate(['/dashboard']);
            },
            error: (err) => console.log(err),
        });
        this.value.username = '';
        this.value.password = '';
    }
}
