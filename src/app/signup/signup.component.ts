import { Component } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent {
    model = {
        title: 'Register',
        subheader: 'if you have already registered.',
        link: '/login',
        linkName: 'Login',
        isRegister: true,
    };
}
