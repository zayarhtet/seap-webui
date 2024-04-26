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
        'px-4 py-2 hover:border-b-2 hover:border-sky-500 hover:text-sky-500 text-lg font-mono tracking-wider text-gray-800 transition-all';
    pillButton =
        'px-4 p-2 hover:bg-red-500 hover:text-white text-red-500 rounded-md text-lg font-mono tracking-wider transition-all border-2 border-red-500 cursor-pointer';

    hasMenuOpen = true;

    ngOnInit(): void {}

    logout() {
        console.log('CLICKED logout()');
    }

    toggleMenu() {
        this.hasMenuOpen = !this.hasMenuOpen;
    }
}
