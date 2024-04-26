import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NewGradingComponent } from '../new-grading/new-grading.component';
import { FamilyService } from '../service/general/family.service';

@Component({
    selector: 'app-grading-duty',
    templateUrl: './grading-duty.component.html',
    styleUrl: './grading-duty.component.scss',
})
export class GradingDutyComponent implements OnInit {
    @Input({required: true}) dutyTitle! : string
    @Input({required: true}) familyName! : string
    grading : any[] = []
    // grading = [
    //     {
    //         gradingId: '47ca2d0b-d166-411d-94bc-635cf54d9ece',
    //         dutyId: '75d1d021-b549-4a23-bb3b-2133bf444f37',
    //         duty: {
    //             duty_id: '75d1d021-b549-4a23-bb3b-2133bf444f37',
    //             title: 'HW4',
    //             isPointSystem: true,
    //             totalPoints: 100,
    //             multipleSubmission: true,
    //         },
    //         username: 'HELLO1',
    //         member: {
    //             firstName: 'first',
    //             lastName: 'last',
    //             username: 'HELLO1',
    //             email: 'blabla01',
    //         },
    //         familyId: 'ff716cbb-501f-471b-b84c-fdc1b6cd6f16',
    //         isSubmitted: false,
    //         isGraded: true,
    //         points: 0,
    //         isLate: false,
    //         isPassed: false,
    //         gradeComment: 'VVERYBAD',
    //         executionComment: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga quas quaerat laboriosam non perferendis dicta quos nisi temporibus cupiditate eligendi numquam nam, delectus eos aspernatur recusandae maiores dolorem praesentium a!',
    //     },
    // ];

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _familyService: FamilyService
    ) {}

    ngOnInit(): void {
        this._route.paramMap.subscribe((p: ParamMap) => {
            this.refreshData(p.get('famId'), p.get('dutyId'));
        });
    }

    triggerExecution() {}

    viewDuty() {
        this._router.navigate(['grading'], {relativeTo: this._route})
    }

    openDetails(element:HTMLElement, block:HTMLElement) {
        element.classList.toggle('hidden')
    }

    refreshData(famId:string | null, dutyId: string | null) {
        if (famId == null || dutyId == null) return

        this._familyService.getGradingByDutyId(famId,dutyId).subscribe({
            next: (res) => {
                this.grading = res.data
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    editGrade(detailComponent:HTMLDivElement, newGradeComponent:HTMLDivElement) {
        detailComponent.classList.toggle('hidden')
        newGradeComponent.classList.toggle('hidden')
    }
}
