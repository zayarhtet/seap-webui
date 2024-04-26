import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrl: './family-member.component.scss'
})
export class FamilyMemberComponent {

    constructor(
        private _router: Router,
        private _route:ActivatedRoute,
        private _location: Location
    ) {

    }
    goBack() {
        // this._location.back();
        this._router.navigate(['../'],{relativeTo:this._route})

    }
}
