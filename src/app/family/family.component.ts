import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyService } from '../service/general/family.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-family',
    templateUrl: './family.component.html',
    styleUrl: './family.component.scss',
})
export class FamilyComponent implements OnInit {
    /* {{seap_host}}:{{seap_port}}/api/my/families */
    /*
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
    */
    families: any[] = [];
    isLoading = true;
    isTutor = false;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _familyService: FamilyService
    ) {}

    async ngOnInit(): Promise<void> {
        this.refreshData();
        this.isTutor = await this.isUserTutor();
    }

    createNewFamily() {
        this._router.navigate(['new-family'], {
            skipLocationChange: false,
            relativeTo: this._route,
        });
    }

    async isUserTutor(): Promise<boolean> {
        const response = await firstValueFrom(
            this._familyService.getMyRole()
        ).catch((r) => {});

        if (response == null) return false;
        if (response.data.length > 0) {
            return response.data[0].name == 'tutor';
        }
        return false;
    }

    perform(familyId: any) {
        this._router.navigate([familyId], {
            skipLocationChange: false,
            relativeTo: this._route,
        });
    }

    refreshData() {
        this._familyService.getMyFamilies().subscribe({
            next: (res) => {
                this.families = res.data;
                this.families.forEach((family)=> {
                    this.isLoading = false
                    this._familyService.getMyFamilyIcon(family.families.familyId).subscribe({
                        next:(data: ArrayBuffer) => {
                            const blob = new Blob([data], { type: 'image/*' });
                            family.families.icon = URL.createObjectURL(blob);
                        },
                        error: (err) => {
                            // console.log(family.families.familyId)
                        }
                    })
                })
            },
            error: (err) => {
                this.isLoading = false
                console.log(err);
            },
        });
    }
}
