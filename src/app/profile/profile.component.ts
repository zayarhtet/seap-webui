import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../service/general/family.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
    profile = {
        firstName: 'Phoo Pwint',
        lastName: 'Latt',
        username: 'miyuki',
        email: 'phoopwintlatt@gmail.com',
        roleId: 1,
        role: {
            roleId: 1,
            name: 'tutor',
        },
        createdAt: '2024-02-24T15:27:42+01:00',
        modifiedAt: '2024-04-29T20:50:39+02:00',
    };

    constructor(private _familyService: FamilyService) {}

    ngOnInit(): void {
        this.refreshData();
    }

    refreshData() {
        this._familyService.getMyProfile().subscribe({
            next: (res) => {
                if (res.data.length > 0) {
                    this.profile = res.data[0];
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
