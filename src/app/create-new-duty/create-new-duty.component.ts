import { Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { publish } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FamilyService } from '../service/general/family.service';

interface duty {
    title: string;
    instruction: string;
    dueDate: string;
    publishedAt: string;
    closingDate: string;
    totalPoints: number;
    isPointSystem: boolean;
    familyId: string | null;
    pluginName: string;
    multipleSubmission: boolean;
}

@Component({
    selector: 'app-create-new-duty',
    templateUrl: './create-new-duty.component.html',
    styleUrl: './create-new-duty.component.scss',
})
export class CreateNewDutyComponent implements OnInit {
    todayDateTime: string = '';
    errorMessage: string = '';
    fileErrorMessage: string = ''

    newDuty: duty = {
        title: '',
        instruction: '',
        dueDate: '',
        publishedAt: '',
        closingDate: '',
        totalPoints: 0,
        isPointSystem: false,
        familyId: '',
        pluginName: '',
        multipleSubmission: false,
    };
    files: File[] = [];
    inputFiles: File[] = [];
    plugins: string[] = []

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _location: Location,
        private _familyService: FamilyService
    ) {}

    ngOnInit(): void {
        if (this._route.parent == null) return;
        this._route.parent.paramMap.subscribe((p: ParamMap) => {
            this.newDuty.familyId = p.get('famId');
            this.refreshData(this.newDuty.familyId)
        });
        this.todayDateTime = formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en');
    }

    refreshData(familyId: string | null) {
        if (familyId == null) {return}

        this._familyService.getPluginList(familyId).subscribe({
            next: (res) => {
                this.plugins = res.data;
            },
            error: (err) => {console.log(err)}
        })

    }

    goBack() {
        this._router.navigate(['../'], { relativeTo: this._route });
        // this._location.back();
    }

    togglePointInput() {
        this.newDuty.isPointSystem = !this.newDuty.isPointSystem;
    }

    changeFiles(event: any, filesElement2:any) {
        this.fileErrorMessage = ''
        Array.from(event.target.files).forEach((file: any) => {
            const hasExisted = this.files.some((storedFile) => storedFile.name == file.name);
            if (!hasExisted) {
                this.files.push(file)
            } else {
                this.fileErrorMessage = "*Cannot upload files with the same name: " + file.name
            }
        });
        filesElement2.value = ""
        // this.files.push(...event.target.files);
    }

    changeInputFiles(event: any, filesElement2:any) {
        this.fileErrorMessage = ''
        Array.from(event.target.files).forEach((file: any) => {
            const hasExisted = this.inputFiles.some((storedFile) => storedFile.name == file.name);
            if (!hasExisted) {
                this.inputFiles.push(file)
            } else {
                this.fileErrorMessage = "*Cannot upload files with the same name: " + file.name
            }
        });
        filesElement2.value = ""
        // this.files.push(...event.target.files);
    }

    removeFromFiles(index: number) {
        this.fileErrorMessage = ''
        this.files.splice(index, 1);
    }
    removeFromInputFiles(index: number) {
        this.fileErrorMessage = ''
        this.inputFiles.splice(index, 1);
    }

    createNewDuty() {
        if (this.newDuty.title.trim().length == 0) {
            this.errorMessage = '*Title is invalid';
            return;
        } else if (this.newDuty.publishedAt.trim().length == 0) {
            this.errorMessage = '*select the valid publish date.';
            return;
        } else if (this.newDuty.dueDate.trim().length == 0) {
            this.errorMessage = '*select the due date.';
            return;
        } else if (this.newDuty.closingDate.trim().length == 0) {
            this.errorMessage = '*select the close date.';
            return;
        } else if (
            this.newDuty.isPointSystem &&
            this.newDuty.totalPoints == 0
        ) {
            this.errorMessage =
                '*fill the total points or uncheck the point system.';
            return;
        }

        let dueDate = new Date(this.newDuty.dueDate);
        let publishDate = new Date(this.newDuty.publishedAt);
        let closeDate = new Date(this.newDuty.closingDate);

        if (publishDate > dueDate) {
            this.errorMessage =
                '*due date cannot be earlier than publish date.';
            return;
        } else if (closeDate < dueDate) {
            this.errorMessage =
                '*close date cannot be earlier than the due date.';
        }

        if (this.newDuty.familyId == null) {
            this.errorMessage = 'unknown family';
            return;
        }

        this.newDuty.title = this.newDuty.title.trim();

        this._familyService
            .postNewDuty(this.newDuty.familyId, this.newDuty)
            .subscribe({
                next: (res) => {
                    console.log(res.dutyId);
                    const formData = new FormData()
                    this.files.forEach(f => {
                        formData.append('files', f)
                    })
                    this.inputFiles.forEach(f => {
                        formData.append('input-files', f)
                    })
                    this._familyService.uploadGivenFiles(res.dutyId, formData).subscribe(
                        {
                            next: (res) => {
                                console.log(res)
                            },
                            error: (err) => {
                                console.log(err)
                            }
                        }
                    )
                    this._router.navigate(['..', 'duty', res.dutyId], {
                        skipLocationChange: false,
                        relativeTo: this._route,
                    });
                },
                error: (err) => {
                    this.errorMessage = 'bad request.';
                },
            });
    }

    changeCloseDate() {
        this.newDuty.closingDate = this.newDuty.dueDate;
    }

    removeErrorMessage() {
        this.errorMessage = '';
    }
}
