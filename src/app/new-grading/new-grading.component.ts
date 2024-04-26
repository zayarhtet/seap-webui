import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


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
        isPassed: false,
        gradeComment: 'VVERYBAD',
        executionComment: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga quas quaerat laboriosam non perferendis dicta quos nisi temporibus cupiditate eligendi numquam nam, delectus eos aspernatur recusandae maiores dolorem praesentium a!',
    };
    // @Input({required: true}) isPointSystem!: boolean;
    // @Input({required: true})

    newGrade : any = {}

    @Output() submitted = new EventEmitter <string>();
    @Output() cancelled = new EventEmitter <string>();

    constructor() {}

    ngOnInit(): void {
        this.newGrade.familyId = this.grading.familyId
        if (!this.grading.duty.isPointSystem) this.newGrade.points = -1

    }

    submitGrade() {
        console.log("submitted grade")
        this.submitted.emit()
    }

    cancelGrade() {
        console.log("cancelled grade")
        this.cancelled.emit()
    }
}
