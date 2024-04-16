import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-single-duty',
    templateUrl: './single-duty.component.html',
    styleUrl: './single-duty.component.scss',
})
export class SingleDutyComponent implements OnInit {

    files?: File[];
    isMultiple = false;

    /* {{seap_host}}:{{seap_port}}/api/my/family/:famId/duty/:dutyId */
    singleDuty = {
        duty_id: '44062536-0d5c-422d-9dd2-b4b03fb7b3df',
        title: 'PT1',
        instruction: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos nam officia sit excepturi maxime? Quo perspiciatis ipsam, nesciunt vitae sequi maiores, officiis deleniti temporibus culpa aliquam dicta obcaecati blanditiis inventore.',
        publishedAt: '2024-03-16T14:30:45+01:00',
        dueDate: '2024-03-17T14:30:45+01:00',
        closingDate: '2024-03-17T14:30:45+01:00',
        familyId: 'ff716cbb-501f-471b-b84c-fdc1b6cd6f16',
        family: {
            familyId: 'ff716cbb-501f-471b-b84c-fdc1b6cd6f16',
            name: 'Functional Programming',
            info: '23/24/2 Group 1',
            icon: '/fp.png',
            createdAt: '2024-03-10T18:13:40+01:00',
            modifiedAt: '0001-01-01T00:00:00Z',
        },
        isPointSystem: true,
        totalPoints: 100,
        multipleSubmission: true,
        files: [],
    };

    /* {{seap_host}}:{{seap_port}}/api/my/family/:famId/myrole */
    myrole = {
        roleId: 2,
        name: 'tutor',
    };

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _location: Location
    ) {}

    ngOnInit(): void {
        this._route.paramMap.subscribe((p: ParamMap) => {
            console.log('dutyId: ' + p.get('dutyId'));
            this.refreshData();
        });
    }

    refreshData() {}

    goBack() {
        // this._router.navigate(['..'])
        this._location.back();
    }

    isUserTutorInFamily() {
        return this.myrole.name == 'tutor';
    }
    uploadFiles(filesElement: HTMLInputElement) {

        // Check whether the files array is not undefined
        if (this.files) {
            // this.uploadService.uploadFile(this.files)
            // .subscribe((res: any) => {
                // alert(res.msg);

                // Resetting the input file tag
            filesElement.value = '';
            // });
            console.log("uploadingfiles")

        } else {
            alert('Please select files to upload!');
        }
    }
    changeFiles(event: any) {

        // On file change set it to files array
        this.files = event.target.files;
    }

    submitDuty() {

    }
}
