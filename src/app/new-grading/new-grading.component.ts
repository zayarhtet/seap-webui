import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyService } from '../service/general/family.service';


@Component({
  selector: 'app-new-grading',
  templateUrl: './new-grading.component.html',
  styleUrl: './new-grading.component.scss'
})
export class NewGradingComponent implements OnInit {
    @Input({required:true}) grading = {
        gradingId: '47ca2d0b-d166-411d-94bc-635cf54d9ece',
        dutyId: '75d1d021-b549-4a23-bb3b-2133bf444f37',
        duty: {
            duty_id: '75d1d021-b549-4a23-bb3b-2133bf444f37',
            title: 'HW4',
            isPointSystem: true,
            totalPoints: 100,
            multipleSubmission: true,
        },
        username: 'HELLO1',
        member: {
            firstName: 'first',
            lastName: 'last',
            username: 'HELLO1',
            email: 'blabla01',
        },
        familyId: 'ff716cbb-501f-471b-b84c-fdc1b6cd6f16',
        isSubmitted: false,
        isGraded: true,
        points: 0,
        isLate: false,
        hasGraded: false,
        isPassed: false,
        gradeComment: 'VVERYBAD',
        executionComment: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga quas quaerat laboriosam non perferendis dicta quos nisi temporibus cupiditate eligendi numquam nam, delectus eos aspernatur recusandae maiores dolorem praesentium a!',
    };
    // @Input({required: true}) isPointSystem!: boolean;
    // @Input({required: true})

    newGrade : any = {
        points: 0,
        username: '',
        gradeComment: ''
    }

    @Output() submitted = new EventEmitter <string>();
    @Output() cancelled = new EventEmitter <string>();

    constructor(
        private _familyService: FamilyService
    ) {}

    ngOnInit(): void {
        this.newGrade.username = this.grading.username
        this.newGrade.gradingId = this.grading.gradingId
        if (!this.grading.duty.isPointSystem) this.newGrade.points = -1

    }

    submitGrade() {
        this._familyService.updateGrading(this.grading.familyId, this.newGrade).subscribe({
            next: (res) => {
                console.log(res)
                this.submitted.emit()
            },
            error: (err) => {
                this.submitted.emit()
                console.log(err)
            }
        })
        // this.submitted.emit()
    }

    cancelGrade() {
        console.log("cancelled grade")
        this.cancelled.emit()
    }

}
