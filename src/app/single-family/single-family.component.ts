import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FamilyService } from '../service/general/family.service';
import { firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-single-family',
    templateUrl: './single-family.component.html',
    styleUrl: './single-family.component.scss',
})
export class SingleFamilyComponent implements OnInit {
    /* {{seap_host}}:{{seap_port}}/api/my/family/:famId/duties */
    // singleFamily = {
    //     familyId: 'ff716cbb-501f-471b-b84c-fdc1b6cd6f16',
    //     name: 'Functional Programming',
    //     info: '23/24/2 Group 1',
    //     icon: '/fp.png',
    //     duties: [
    //         {
    //             dutyId: '44062536-0d5c-422d-9dd2-b4b03fb7b3df',
    //             title: 'PT1',
    //             publishedAt: '2024-03-16T14:30:45+01:00',
    //             dueDate: '2024-03-17T14:30:45+01:00',
    //             closingDate: '2024-03-17T14:30:45+01:00',
    //         }
    //     ],
    //     dutiesWithSubmission: [
    //         {
    //             duty: {
    //                 dutyId: 'cd8cc9bb-0724-424d-bd94-999195e3cc84',
    //                 title: 'HW1',
    //                 publishedAt: '2024-03-16T14:30:45+01:00',
    //                 dueDate: '2024-03-17T14:30:45+01:00',
    //                 closingDate: '2024-03-17T14:30:45+01:00',
    //             },
    //             isSubmitted: true,
    //         },
    //     ],
    // };

    singleFamily: any = {};
    isLoading = true;

    isUserTutorInFamily = false;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _familyService: FamilyService,
        private _datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this._route.paramMap.subscribe(async (p: ParamMap) => {
            this.refreshData(p.get('famId'));
            let tutor = await this.isTutorInFamily(p.get('famId'));
            if (tutor != null) {
                this.isUserTutorInFamily = tutor;
            }
        });
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

    createNewDuty() {
        this._router.navigate(['new-duty'], {
            skipLocationChange: false,
            relativeTo: this._route,
        });
    }

    openDuty(id: string) {
        this._router.navigate(['duty/' + id], {
            skipLocationChange: false,
            relativeTo: this._route,
        });
    }

    openMember() {
        this._router.navigate(['members'], {
            skipLocationChange: false,
            relativeTo: this._route,
        });
    }

    goBack() {
        // this._location.back();
        this._router.navigate(['../'], { relativeTo: this._route });
    }

    refreshData(famId: string | null) {
        if (famId == null) return;

        this._familyService.getMyDutiesByFamily(famId).subscribe({
            next: (res) => {
                if (res.data.length > 0) {
                    this.singleFamily = res.data[0];
                    this.isLoading = false;
                    // this.hasDeadlinePassed = res.
                }
            },
            error: (err) => {
                this.isLoading = false;
                console.log(err);
            },
        });
    }

    deleteFamily() {
        if (confirm('Are you sure to delete this family?')) {
            this._familyService
                .deleteFamily(this.singleFamily.familyId)
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

    hasDeadlinePassed(item: any) :boolean {
        return new Date(item.duty.dueDate) < new Date()
    }

    hasPublished(datestring: string) {
        return new Date() > new Date(datestring)
    }
}
