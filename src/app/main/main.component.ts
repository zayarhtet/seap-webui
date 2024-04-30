import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FamilyService } from '../service/general/family.service';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
    items: MenuItem[] = [];
    constructor(private _authService: AuthService, private _router: Router) {}

    navButtonClass =
        'px-4 py-2 hover:border-b-2 hover:border-sky-500 hover:text-sky-500 text-lg tracking-wider text-gray-800 transition-all';
    pillButton =
        'px-4 p-2 hover:bg-red-500 hover:text-white text-red-500 rounded-md text-lg tracking-wider transition-all border-2 border-red-500 cursor-pointer';

    hasMenuOpen = true;

    ngOnInit(): void {}

    logout() {
        if (confirm("Do you want to logout?")) {

            this._authService.deleteToken()
            this._router.navigate(['login'])
        }
    }

    toggleMenu() {
        this.hasMenuOpen = !this.hasMenuOpen;
    }
}
