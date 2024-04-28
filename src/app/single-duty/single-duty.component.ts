import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { FamilyService } from '../service/general/family.service';
import { firstValueFrom } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app-single-duty',
    templateUrl: './single-duty.component.html',
    styleUrl: './single-duty.component.scss',
})
export class SingleDutyComponent implements OnInit {
    files: File[] = [];
    isMultiple = false;

    /* {{seap_host}}:{{seap_port}}/api/my/family/:famId/duty/:dutyId */
    // singleDuty = {
    //     dutyId: '44062536-0d5c-422d-9dd2-b4b03fb7b3df',
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
    fileErrorMessage = '';
    grading: any = {};
    uploadedFiles: any = []
    expired: boolean = false

    /* {{seap_host}}:{{seap_port}}/api/my/family/:famId/myrole */
    myrole = {
        roleId: 2,
        name: 'tutor',
    };

    isUserTutorInFamily = false;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _location: Location,
        private _familyService: FamilyService,
        private _datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this._route.paramMap.subscribe(async (p: ParamMap) => {
            let tutor = await this.isTutorInFamily(p.get('famId'));
            if (tutor != null) {
                this.isUserTutorInFamily = tutor;
            }
            this.refreshData(p.get('famId'), p.get('dutyId'));
            // if (this.isUserTutorInFamily) return
        });
    }

    refreshData(famId: string | null, dutyId: string | null) {
        if (famId == null || dutyId == null) return;

        this._familyService.getDutyById(famId, dutyId).subscribe({
            next: (res) => {
                if (res.data.length > 0) {
                    this.singleDuty = res.data[0];
                    this.expired = new Date() > new Date(this.singleDuty.closingDate)
                }
            },
            error: (err) => {
                this.goBack();
                console.log(err);
            },
        });
        if (!this.isUserTutorInFamily) {

            this._familyService.uploadSubmittedFiles(famId, dutyId, new FormData()).subscribe({
                next:(res) => {
                    this.uploadedFiles = res.data
                }, error:(err) => {
                    console.log(err)
                }
            })
        }
        if (!this.isUserTutorInFamily) {
            this._familyService.getGradingById(famId, dutyId).subscribe({
                next: (res) => {
                    if (res.data.length > 0) {
                        this.grading = res.data[0];
                        this.expired = this.expired || this.grading.isSubmitted
                    }
                },
                error: (err) => {
                    console.log(err)
                }
            })
        }
    }

    goBack() {
        this._router.navigate(['../..'], { relativeTo: this._route });
        // this._location.back();
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

    uploadFiles(filesElement: HTMLInputElement) {
        if (this.files.length == 0) return;
        const formData = new FormData();
        this.files.forEach((f) => {
            formData.append('files', f);
        });
        this._familyService
            .uploadSubmittedFiles(
                this.singleDuty.family.familyId,
                this.singleDuty.dutyId,
                formData
            )
            .subscribe({
                next: (res) => {
                    this.uploadedFiles = res.data
                    this.files = []
                },
                error: (err) => {
                    console.log(err);
                    this.files = []
                },
            });
    }

    changeFiles(event: any, filesElement2:any) {
        this.fileErrorMessage = '';
        Array.from(event.target.files).forEach((file: any) => {
            const hasExisted = this.files.some(
                (storedFile) => storedFile.name == file.name
            );
            if (!hasExisted) {
                this.files.push(file);
            } else {
                this.fileErrorMessage =
                    '*Cannot upload files with the same name: ' + file.name;
            }
        });
        filesElement2.value = ''
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

    downloadSubmittedFile(famId: string, dutyId: string, fileId: string) {
        this._familyService.downloadSubmittedFile(famId, dutyId, fileId).subscribe({
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
    deleteSubmittedFile(famId: string, dutyId: string, fileId: string) {
        this._familyService.deleteSubmittedFile(famId, dutyId, fileId).subscribe({
            next: (res) => {
                this._familyService.uploadSubmittedFiles(famId, dutyId, new FormData()).subscribe({
                    next:(res) => {
                        this.uploadedFiles = res.data
                    }, error:(err) => {
                        console.log(err)
                    }
                })
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    removeFromFiles(index: number) {
        this.fileErrorMessage = ''
        this.files.splice(index, 1);
    }

    submitDuty() {
        if (!confirm("Are you sure you want to submit? Once you submit, you cannot modify it.")) return
        this._familyService.submitDuty(this.singleDuty.familyId, this.singleDuty.dutyId, this.grading.gradingId).subscribe({
            next: (res) => {
                this.refreshData(this.singleDuty.familyId, this.singleDuty.dutyId)
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    getFormattedDate(dateToParse: string) {
        return this._datePipe.transform(dateToParse, 'medium');
    }


}
