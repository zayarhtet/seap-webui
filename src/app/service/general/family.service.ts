import { Injectable } from '@angular/core';
import { ENDPOINT } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class FamilyService {
    private _myFamiliesURL = ENDPOINT + 'my/families';
    private _myRoleURL = ENDPOINT + 'my/role';
    private _myDutiesByFamilyURL = ENDPOINT + 'my/family/:famId/duties';
    private _membersByFamilyURL = ENDPOINT + 'my/family/:famId/members';
    private _addMemberFamilyURL = ENDPOINT + 'my/family/:famId/addMember';
    private _myRoleInFamURL = ENDPOINT + 'my/family/:famId/myrole';
    private _dutyById = ENDPOINT + 'my/family/:famId/duty/:dutyId';
    private _gradingByIds = ENDPOINT + 'my/family/:famId/duty/:dutyId/grading';
    private _myDutiesURL = ENDPOINT + 'my/duties';
    private _newDutyURL = ENDPOINT + 'my/family/:famId/create/duty';
    private _newFamilyURL = ENDPOINT + 'my/create/family';
    private _myIconURL = ENDPOINT + 'my/cdn/download/:famId/family-icon';
    private _uploadGivenFileURL = ENDPOINT + 'my/cdn/upload/:dutyId/given-file';
    private _downloadGivenFileURL =
        ENDPOINT + 'my/cdn/download/:famId/:dutyId/file/:fileId';
    private _uploadSubmittedFilesURL =
        ENDPOINT + 'my/cdn/upload/family/:famId/duty/:dutyId/submitted-file';
    private _downloadSubmittedFileURL =
        ENDPOINT +
        'my/cdn/download/family/:famId/duty/:dutyId/submitted-file/:fileId';
    private _deleteSubmittedFileURL =
        ENDPOINT +
        'my/cdn/delete/family/:famId/duty/:dutyId/submitted-file/:fileId';
    private _updateGradingURL = ENDPOINT + 'my/family/:famId/create/grade';
    private _deleteFamilyURL = ENDPOINT + 'my/family/:famId';
    private _deleteDutyURL = ENDPOINT + 'my/family/:famId/duty/:dutyId';
    private _getMyGradingURL =
        ENDPOINT + 'my/family/:famId/duty/:dutyId/my-grading';

    private _submitDutyURL =
        ENDPOINT + 'my/family/:famId/duty/:dutyId/submit/:gradingId/done';

    constructor(private http: HttpClient, private _datePipe: DatePipe) {}

    getMyFamilies() {
        return this.http.get<any>(this._myFamiliesURL);
    }

    getMyRole() {
        return this.http.get<any>(this._myRoleURL);
    }

    getMyDuties() {
        return this.http.get<any>(this._myDutiesURL);
    }

    getMyDutiesByFamily(famId: string) {
        return this.http.get<any>(
            this._myDutiesByFamilyURL.replace(':famId', famId)
        );
    }
    getMyMembersByFamily(famId: string) {
        return this.http.get<any>(
            this._membersByFamilyURL.replace(':famId', famId)
        );
    }

    getMyRoleInFamily(famId: string) {
        return this.http.get<any>(
            this._myRoleInFamURL.replace(':famId', famId)
        );
    }

    getDutyById(famId: string, dutyId: string) {
        return this.http.get<any>(
            this._dutyById.replace(':famId', famId).replace(':dutyId', dutyId)
        );
    }

    getGradingByDutyId(famId: string, dutyId: string) {
        return this.http.get<any>(
            this._gradingByIds
                .replace(':famId', famId)
                .replace(':dutyId', dutyId)
        );
    }

    postNewDuty(famId: string, newDuty: any) {
        return this.http.post<any>(
            this._newDutyURL.replace(':famId', famId),
            newDuty
        );
    }
    addNewMember(famId: string, newMember: any) {
        return this.http.post<any>(
            this._addMemberFamilyURL.replace(':famId', famId),
            newMember
        );
    }

    postNewFamily(newFamily: FormData) {
        return this.http.post<any>(this._newFamilyURL, newFamily);
    }

    getMyFamilyIcon(famId: string) {
        return this.http.get(this._myIconURL.replace(':famId', famId), {
            responseType: 'arraybuffer',
        });
    }

    uploadGivenFiles(dutyId: string, formData: FormData) {
        return this.http.post<any>(
            this._uploadGivenFileURL.replace(':dutyId', dutyId),
            formData
        );
    }

    downloadGivenFile(famId: string, dutyId: string, fileId: string) {
        return this.http.get(
            this._downloadGivenFileURL
                .replace(':famId', famId)
                .replace(':dutyId', dutyId)
                .replace(':fileId', fileId),
            { responseType: 'blob', observe: 'response' }
        );
    }

    uploadSubmittedFiles(famId: string, dutyId: string, formData: FormData) {
        return this.http.post<any>(
            this._uploadSubmittedFilesURL
                .replace(':dutyId', dutyId)
                .replace(':famId', famId),
            formData
        );
    }

    downloadSubmittedFile(famId: string, dutyId: string, fileId: string) {
        return this.http.get(
            this._downloadSubmittedFileURL
                .replace(':famId', famId)
                .replace(':dutyId', dutyId)
                .replace(':fileId', fileId),
            { responseType: 'blob', observe: 'response' }
        );
    }

    deleteSubmittedFile(famId: string, dutyId: string, fileId: string) {
        return this.http.delete(
            this._deleteSubmittedFileURL
                .replace(':famId', famId)
                .replace(':dutyId', dutyId)
                .replace(':fileId', fileId)
        );
    }

    updateGrading(famId: string, newGrade: any) {
        return this.http.post<any>(
            this._updateGradingURL.replace(':famId', famId),
            newGrade
        );
    }

    deleteFamily(famId: string) {
        return this.http.delete(this._deleteFamilyURL.replace(':famId', famId));
    }

    deleteDuty(famId: string, dutyId: string) {
        return this.http.delete(
            this._deleteDutyURL
                .replace(':famId', famId)
                .replace(':dutyId', dutyId)
        );
    }

    getFormattedDate(dateToParse: string) {
        return this._datePipe.transform(dateToParse, 'medium');
    }

    getGradingById(famId: string, dutyId: string) {
        return this.http.get<any>(
            this._getMyGradingURL
                .replace(':famId', famId)
                .replace(':dutyId', dutyId)
        );
    }

    submitDuty(famId: string, dutyId: string, gradingId: string) {
        return this.http.post(
            this._submitDutyURL
                .replace(':famId', famId)
                .replace(':dutyId', dutyId)
                .replace(':gradingId', gradingId), ""
        );
    }
}
