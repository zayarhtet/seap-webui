import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-single-family',
    templateUrl: './single-family.component.html',
    styleUrl: './single-family.component.scss',
})
export class SingleFamilyComponent implements OnInit {
    /* {{seap_host}}:{{seap_port}}/api/my/family/:famId/duties */
    singleFamily = {
        familyId: 'ff716cbb-501f-471b-b84c-fdc1b6cd6f16',
        name: 'Functional Programming',
        info: '23/24/2 Group 1',
        icon: '/fp.png',
        duties: [
            {
                duty_id: '44062536-0d5c-422d-9dd2-b4b03fb7b3df',
                title: 'PT1',
                publishedAt: '2024-03-16T14:30:45+01:00',
                dueDate: '2024-03-17T14:30:45+01:00',
                closingDate: '2024-03-17T14:30:45+01:00',
            },
            {
                duty_id: 'cd8cc9bb-0724-424d-bd94-999195e3cc84',
                title: 'HW1',
                publishedAt: '2024-03-16T14:30:45+01:00',
                dueDate: '2024-03-17T14:30:45+01:00',
                closingDate: '2024-03-17T14:30:45+01:00',
            },
            {
                duty_id: 'dc80e248-6afe-4638-88b0-a67f3c527c7b',
                title: 'HW2',
                publishedAt: '2024-03-16T14:30:45+01:00',
                dueDate: '2024-03-17T14:30:45+01:00',
                closingDate: '2024-03-17T14:30:45+01:00',
            },
            {
                duty_id: 'ed2ed253-6ce8-4130-a70a-a980588a9dee',
                title: 'HW3',
                publishedAt: '2024-03-16T14:30:45+01:00',
                dueDate: '2024-03-17T14:30:45+01:00',
                closingDate: '2024-03-17T14:30:45+01:00',
            },
        ],
        dutiesWithSubmission: [
            {
                duty: {
                    duty_id: 'cd8cc9bb-0724-424d-bd94-999195e3cc84',
                    title: 'HW1',
                    publishedAt: '2024-03-16T14:30:45+01:00',
                    dueDate: '2024-03-17T14:30:45+01:00',
                    closingDate: '2024-03-17T14:30:45+01:00',
                },
                isSubmitted: true,
            },
            {
                duty: {
                    duty_id: 'ed2ed253-6ce8-4130-a70a-a980588a9dee',
                    title: 'HW3',
                    publishedAt: '2024-03-16T14:30:45+01:00',
                    dueDate: '2024-03-17T14:30:45+01:00',
                    closingDate: '2024-03-17T14:30:45+01:00',
                },
                isSubmitted: false,
            },
            {
                duty: {
                    duty_id: 'dc80e248-6afe-4638-88b0-a67f3c527c7b',
                    title: 'HW2',
                    publishedAt: '2024-03-16T14:30:45+01:00',
                    dueDate: '2024-03-17T14:30:45+01:00',
                    closingDate: '2024-03-17T14:30:45+01:00',
                },
                isSubmitted: false,
            },
            {
                duty: {
                    duty_id: '44062536-0d5c-422d-9dd2-b4b03fb7b3df',
                    title: 'PT1',
                    publishedAt: '2024-03-16T14:30:45+01:00',
                    dueDate: '2024-03-17T14:30:45+01:00',
                    closingDate: '2024-03-17T14:30:45+01:00',
                },
                isSubmitted: true,
            },
        ],
    };

    /* {{seap_host}}:{{seap_port}}/api/my/family/:famId/myrole */
    myrole = {
        roleId: 2,
        name: 'tutor',
    };

    hasDeadlinePassed = false;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _location: Location
    ) {}

    ngOnInit(): void {
        this._route.paramMap.subscribe((p: ParamMap) => {
            console.log('famId: ' + p.get('famId'));
            this.refreshData();
        });
    }

    isUserTutorInFamily() {
        return this.myrole.name == 'tutor';
    }

    createNewDuty() {
        console.log('createnewduty() clicked');
    }

    openDuty(id: string) {
        this._router.navigate(['duty/' + id], {
            skipLocationChange: false,
            relativeTo: this._route,
        });
    }

    goBack() {
        // this._router.navigate(['..'])
        this._location.back();
    }

    refreshData() {}
}
