import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    constructor(private _router: Router, private _route: ActivatedRoute) {}
    ngOnInit(): void {}

    forwardToFamily() {
        this._router.navigate(['family'], { relativeTo: this._route });
    }
}
