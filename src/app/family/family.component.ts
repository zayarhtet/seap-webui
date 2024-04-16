import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-family',
    templateUrl: './family.component.html',
    styleUrl: './family.component.scss',
})
export class FamilyComponent implements OnInit {
    /* {{seap_host}}:{{seap_port}}/api/my/families */
    families = [
        {
            families: {
                familyId: '25929b0c-b2f3-4bf4-966e-7d5782d549c8',
                name: 'Thesis3',
                info: 'Thesis submission',
                icon: './thesis.png',
            },
            familyRole: {
                roleId: 1,
                name: 'tutor',
            },
            addedAt: '2024-03-13T14:54:43+01:00',
        },
        {
            families: {
                familyId: '803360bc-71f4-4b10-a119-ed93de707650',
                name: 'Imperative Programming',
                info: '23/24/2 Group 1',
                icon: '/fp.png',
            },
            familyRole: {
                roleId: 1,
                name: 'tutor',
            },
            addedAt: '2024-03-10T19:35:41+01:00',
        },
        {
            families: {
                familyId: '9dc1b896-4384-4cc8-bbcc-aaa773067153',
                name: 'Object-oriented Programming',
                info: '23/24/2 Group 1',
                icon: '/fp.png',
            },
            familyRole: {
                roleId: 1,
                name: 'tutor',
            },
            addedAt: '2024-03-13T15:20:33+01:00',
        },
        {
            families: {
                familyId: 'c64fec03-c9e7-4930-a8f4-de677f55b777',
                name: 'Thesis',
                info: 'Thesis submission',
                icon: './thesis.png',
            },
            familyRole: {
                roleId: 1,
                name: 'tutor',
            },
            addedAt: '2024-03-13T14:52:17+01:00',
        },
        {
            families: {
                familyId: 'f9851625-601c-483b-8efa-643bd9a55b8a',
                name: 'Thesis',
                info: 'Thesis submission',
                icon: './thesis.png',
            },
            familyRole: {
                roleId: 1,
                name: 'tutor',
            },
            addedAt: '2024-03-13T14:49:31+01:00',
        },
        {
            families: {
                familyId: 'f9851625-601c-483b-8efa-643bd9a55b8a',
                name: 'Thesis',
                info: 'Thesis submission',
                icon: './thesis.png',
            },
            familyRole: {
                roleId: 1,
                name: 'tutor',
            },
            addedAt: '2024-03-13T14:49:31+01:00',
        },
        {
            families: {
                familyId: 'f9851625-601c-483b-8efa-643bd9a55b8a',
                name: 'Thesis',
                info: 'Thesis submission',
                icon: './thesis.png',
            },
            familyRole: {
                roleId: 1,
                name: 'tutor',
            },
            addedAt: '2024-03-13T14:49:31+01:00',
        },
        {
            families: {
                familyId: 'ff716cbb-501f-471b-b84c-fdc1b6cd6f16',
                name: 'Functional Programming',
                info: '23/24/2 Group 1',
                icon: '/fp.png',
            },
            familyRole: {
                roleId: 2,
                name: 'tutee',
            },
            addedAt: '2024-03-10T19:35:41+01:00',
        },
    ];
    hello = true;

    constructor(private _router: Router, private _route: ActivatedRoute) {}

    ngOnInit(): void {}

    createNewFamily() {
        console.log('CLICKED create family');
    }

    isUserTutor(): boolean {
        return this.hello;
    }

    perform(familyId: any) {
        this._router.navigate([familyId], {
            skipLocationChange: false,
            relativeTo: this._route,
        });
    }
}
