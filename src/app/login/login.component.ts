import { Component } from '@angular/core';

@Component({
    selector: 'login-container',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    model = {
        title: 'Login',
        subheader: "if you don't have an account.",
        link: '/signup',
        linkName: 'Register',
        isRegister: false,
    };
}
