import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { NgModel, NgForm, AbstractControl } from '@angular/forms';

@Component({
    selector: 'auth-card',
    templateUrl: './auth-card.component.html',
    styleUrl: './auth-card.component.scss',
})
export class AuthCardComponent implements OnInit {
    @Input() public model: any;

    authModelState: any = {};
    responsiveStyleSheet = {
        margin: '',
    };
    inputNames = {
        username: 'username',
        password: 'password',
        confirmedPassword: 'confirmedPassword',
        email: 'email',
    };

    areValid = {
        username: true,
        password: true,
        email: true,
        confirmedPassword: true,
    };

    validationErrorLog = {
        username: '',
        password: '',
        emailError: '',
        confirmedPasswordError: '',
    };

    constructor(private _auth: AuthService, private _router: Router) {}

    ngOnInit() {
        if (this.model.isRegister) {
            this.responsiveStyleSheet.margin = 'my-6';
        } else {
            this.responsiveStyleSheet.margin = 'my-20';
        }
    }

    loginUser(loginNgForm: NgForm) {
        Object.keys(loginNgForm.controls).forEach(key => {
            loginNgForm.controls[key].markAsTouched();
        });
        if (loginNgForm.invalid) {
            console.log('INVALID LOGIN!');
            return;
        }

        this._auth.loginRequest(this.authModelState).subscribe({
            next: (res) => {
                console.log(res);
                this._router.navigate(['/dashboard']);
            },
            error: (err) => console.log(err),
        });
        Object.keys(loginNgForm.controls).forEach(key => {
            loginNgForm.controls[key].markAsUntouched();
            loginNgForm.controls[key].setValue('');
        });
    }

    setUsernameError(username: string | null) {
        if (username == null || username.trim().length == 0) {
            this.validationErrorLog.username = 'username is required!';
        } else if (username.trim().length < 3) {
            this.validationErrorLog.username =
                'username should be at least 3 characters!';
        } else if (username.trim().length > 20) {
            this.validationErrorLog.username =
                'username should be at most 20 characters!';
        } else if (!new RegExp('^[a-zA-Z0-9_]+$').test(username.trim())) {
            this.validationErrorLog.username =
                'username should be alphanumeric characters!';
        } else {
            return true;
        }
        return false;
    }

    setPasswordError(password: string | null) {
        if (password == null || password.trim().length == 0) {
            this.validationErrorLog.password = 'password is required!';
        } else if (
            password.trim().length < 8 ||
            password.trim().length > 20
        ) {
            this.validationErrorLog.password = 'password is invalid!';
        } else {
            return true;
        }
        return false;
    }

    /******** functions to be call in template **********/

    validateUsername(username: NgModel) {
        if (username.untouched) return true;
        if (!this.setUsernameError(username.value)) {
            username.control.setErrors({ incorrect: true });
        }
        return username.valid;
    }

    validatePassword(password: NgModel) {
        if (password.untouched) return true;
        if (!this.setPasswordError(password.value)) {
            password.control.setErrors({ incorrect: true });
        }
        return password.valid;
    }
}
