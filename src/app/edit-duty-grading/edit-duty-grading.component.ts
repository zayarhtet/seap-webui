import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FamilyService } from '../service/general/family.service';
import { firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-edit-duty-grading',
    templateUrl: './edit-duty-grading.component.html',
    styleUrl: './edit-duty-grading.component.scss',
})
export class EditDutyGradingComponent implements OnInit {
    isMultiple = false;

    /* {{seap_host}}:{{seap_port}}/api/my/family/:famId/duty/:dutyId */
    // singleDuty = {
    //     duty_id: '44062536-0d5c-422d-9dd2-b4b03fb7b3df',
    //     title: 'PT1',
    //     instruction: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos nam officia sit excepturi maxime? Quo perspiciatis ipsam, nesciunt vitae sequi maiores, officiis deleniti temporibus culpa aliquam dicta obcaecati blanditiis inventore.',
    //     publishedAt: '2024-03-16T14:30:45+01:00',
    //     dueDate: '2024-03-17T14:30:45+01:00',
    //     closingDate: '2024-03-17T14:30:45+01:00',
    //     familyId: 'ff716cbb-501f-471b-b84c-fdc1b6cd6f16',
    //     family: {
    //         familyId: 'ff716cbb-501f-471b-b84c-fdc1b6cd6f16',
    //         name: 'Functional Programming',
    //         info: '23/24/2 Group 1',
    //         icon: '/fp.png',
    //         createdAt: '2024-03-10T18:13:40+01:00',
    //         modifiedAt: '0001-01-01T00:00:00Z',
    //     },
    //     isPointSystem: true,
    //     totalPoints: 100,
    //     multipleSubmission: true,
    //     files: [                {
    //     "fileId": "336f6733-54a9-470e-8f41-1fcbb78b1af4",
    //     "dutyId": "45b7644b-db20-48d6-9cc2-16531aa39c00",
    //     "filePath": "Screenshot_2.png"
    // },
    // {
    //     "fileId": "4ed28cbc-e3d9-4506-8f08-229693521623",
    //     "dutyId": "45b7644b-db20-48d6-9cc2-16531aa39c00",
    //     "filePath": "Screenshot_1.png"
    // }],
    // };

    singleDuty: any = {};

    /* {{seap_host}}:{{seap_port}}/api/my/family/:famId/myrole */
    myrole = {
        roleId: 2,
        name: 'tutor',
    };

    isUserTutorInFamily = false;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _familyService: FamilyService,
        private _datePipe: DatePipe,
    ) {}

    ngOnInit(): void {
        if (this._route.parent == null) return;
        this._route.parent.paramMap.subscribe(async (p: ParamMap) => {
            this.refreshData(p.get('famId'), p.get('dutyId'));
            let tutor = await this.isTutorInFamily(p.get('famId'));
            if (tutor != null) {
                this.isUserTutorInFamily = tutor;
                if (!tutor) this.goBack();
            }
        });
    }

    refreshData(famId: string | null, dutyId: string | null) {
        if (famId == null || dutyId == null) return;

        this._familyService.getDutyById(famId, dutyId).subscribe({
            next: (res) => {
                if (res.data.length > 0) {
                    this.singleDuty = res.data[0];
                }
            },
            error: (err) => {
                this.goBack();
                console.log(err);
            },
        });
    }

    goBack() {
        this._router.navigate(['../'], { relativeTo: this._route });
    }

    async isTutorInFamily(famId: string | null) {
        if (famId == null) return;
        const response = await firstValueFrom(
            this._familyService.getMyRoleInFamily(famId)
        ).catch((r) => {
            this.goBack();
            console.log(r);
        });

        if (response == null) return false;
        if (response.data.length > 0) {
            return response.data[0].name == 'tutor';
        }
        return false;
    }

    downloadGivenFile(famId: string, dutyId: string, fileId: string) {
        this._familyService.downloadGivenFile(famId, dutyId, fileId).subscribe({
            next: (res) => {
                if (res.body == null) return;
                const contentDispositionHeader = res.headers.get(
                    'Content-Disposition'
                );
                const filename = contentDispositionHeader
                    ? contentDispositionHeader
                          .split(';')[1]
                          .trim()
                          .split('=')[1]
                    : 'file';

                const blob = new Blob([res.body], { type: res.body.type });
                const blobUrl = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = filename;

                link.click();
                window.URL.revokeObjectURL(blobUrl);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    deleteDuty() {
        if (confirm('Are you sure to delete this DUTY?')) {
            this._familyService
                .deleteDuty(this.singleDuty.familyId, this.singleDuty.dutyId)
                .subscribe({
                    next: (res) => {
                        this.goBack();
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
        }
    }

    getFormattedDate(dateToParse: string) {
        return this._datePipe.transform(dateToParse, 'medium');
    }
}
