import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-duty',
    templateUrl: './duty.component.html',
    styleUrl: './duty.component.scss',
})
export class DutyComponent implements OnInit {
    duties = [
        {
            duty: {
                duty_id: 'cd8cc9bb-0724-424d-bd94-999195e3cc84',
                title: 'HW1',
                publishedAt: '2024-03-16T14:30:45+01:00',
                dueDate: '2024-03-17T14:30:45+01:00',
                closingDate: '2024-03-17T14:30:45+01:00',
            },
            family: {
                name: 'Functional Programming',
            },
            isSubmitted: true,
        },
        {
            duty: {
                duty_id: 'ed2ed253-6ce8-4130-a70a-a980588a9dee',
                title: 'HW3',
                publishedAt: '2024-03-16T14:30:45+01:00',
                dueDate: '2024-03-17T14:30:45+01:00',
                closingDate: '2024-03-17T14:30:45+01:00',
            },
            family: {
                name: 'Functional Programming',
            },
            isSubmitted: false,
        },
        {
            duty: {
                duty_id: 'dc80e248-6afe-4638-88b0-a67f3c527c7b',
                title: 'HW2',
                publishedAt: '2024-03-16T14:30:45+01:00',
                dueDate: '2024-03-17T14:30:45+01:00',
                closingDate: '2024-03-17T14:30:45+01:00',
            },
            family: {
                name: 'Functional Programming',
            },
            isSubmitted: true,
        },
        {
            duty: {
                duty_id: '44062536-0d5c-422d-9dd2-b4b03fb7b3df',
                title: 'PT1',
                publishedAt: '2024-03-16T14:30:45+01:00',
                dueDate: '2024-03-17T14:30:45+01:00',
                closingDate: '2024-03-17T14:30:45+01:00',
            },
            family: {
                name: 'Functional Programming',
            },
            isSubmitted: true,
        },
    ];
    hasDeadlinePassed = false;

    ngOnInit(): void {}

    openDuty(id:string) {}
}
