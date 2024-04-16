import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
    items: MenuItem[] = [];
    navButtonClass =
        'px-4 py-2 hover:border-b-2 hover:border-sky-500 hover:text-sky-500 text-lg font-sans tracking-wider text-gray-800 transition-all';
    pillButton =
        'px-4 py-2 bg-red-200 hover:bg-red-500 hover:text-white rounded-full text-lg font-sans tracking-wider transition-all';

    hasMenuOpen = true;

    ngOnInit(): void {}

    logout() {
        console.log('CLICKED logout()');
    }

    toggleMenu() {
        this.hasMenuOpen = !this.hasMenuOpen;
    }
}
