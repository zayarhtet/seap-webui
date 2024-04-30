import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FamilyService } from '../service/general/family.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-family-member',
    templateUrl: './family-member.component.html',
    styleUrl: './family-member.component.scss',
})
export class FamilyMemberComponent implements OnInit {
    family: any = {};

    newMember: any = {username: "", roleId:2}

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _familyService: FamilyService,
        private _datePipe: DatePipe
    ) {}


    ngOnInit(): void {
        if (this._route.parent == null) return
        this._route.parent.paramMap.subscribe(async (p: ParamMap) => {
            let tutor = await this.isTutorInFamily(p.get('famId'));
            if (tutor != null && tutor) {
                this.refreshData(p.get('famId'));
            }
        });
    }

    async isTutorInFamily(famId: string | null) {
        if (famId == null) return false;
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

    refreshData(famId: string | null) {
        if (famId == null) return;

        this._familyService.getMyMembersByFamily(famId).subscribe({
            next: (res) => {
                if (res.data.length > 0) {
                    this.family = res.data[0];
                }
            },
            error: (err) => {
                this.goBack();
                console.log(err);
            },
        });
    }
    message = ""
    clearMessage() {
        this.message = ""
    }

    addMember() {
        if (this.newMember.username.length == 0) {this.message = "enter valid username"; return}
        if (this.newMember.roleId > 2 || this.newMember.roleId < 1) {this.message = "select valid role";return}

        this._familyService.addNewMember(this.family.familyId, this.newMember).subscribe({
            next: (res) => {
                if (res.data.length > 0) {
                    this.family = res.data[0]
                }
            },
            error: (err) => {
                console.log(err)
                this.message = "username doesn't exist or already added to this family."
            }
        })
    }

    goBack() {
        this._router.navigate(['../'], { relativeTo: this._route });
    }
    getFormattedDate(dateToParse: string) {
        return this._datePipe.transform(dateToParse, 'MMM d, y, HH:mm:ss');
    }
}
