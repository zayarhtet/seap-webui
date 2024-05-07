import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyService } from '../service/general/family.service';

interface Family {
    familyName: string;
    familyInfo: string;
    familyIcon: File | null;
}

@Component({
    selector: 'app-create-new-family',
    templateUrl: './create-new-family.component.html',
    styleUrl: './create-new-family.component.scss',
})
export class CreateNewFamilyComponent implements OnInit {
    newFamily: Family = {
        familyName: '',
        familyInfo: '',
        familyIcon: null,
    };

    errorMessage = '';

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _familyService: FamilyService
    ) {}

    ngOnInit(): void {}

    goBack() {
        // this._location.back();
        this._router.navigate(['../'], { relativeTo: this._route });
    }

    createNewFamily() {
        if (this.newFamily.familyName.trim().length == 0) {
            this.errorMessage = 'family name is invalid.';
            return;
        }
        this.newFamily.familyName = this.newFamily.familyName.trim();

        const formData = new FormData();
        Object.keys(this.newFamily).forEach((key) => {
            formData.append(key, (this.newFamily as any)[key]);
        });

        this._familyService.postNewFamily(formData).subscribe({
            next: (res) => {
                if (res.data.length > 0) {
                    this._router.navigate(['..', res.data[0].familyId], {
                        relativeTo: this._route,
                    });
                }
            },
            error: (err) => {console.log(err)},
        });
    }

    changeFiles(event: any) {
        this.newFamily.familyIcon = event.target.files[0];
    }
    removeErrorMessage() {
        this.errorMessage = '';
    }
}
