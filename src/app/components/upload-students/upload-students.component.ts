import { Component } from '@angular/core';
import { PeopleService } from '../../providers/people.service';
import { ToastService } from '../../providers/toast.service';
import { LoaderService } from '../../providers/loader.service';

@Component({
    selector: 'app-upload-students',
    templateUrl: './upload-students.component.html',
})

export class UploadStudentsComponent {


    file: File;

    constructor(
        private peopleService: PeopleService,
        private toastService: ToastService,
        private laoderService: LoaderService
    ) { }

    onFileSelect(ev: any) {
        if (ev.target.files[0] && this.isCompatibleFile(ev.target.files[0])) {

            this.file = ev.target.files[0];
        } else {
            this.file = null;
        }
        console.log(this.file);

    }

    isCompatibleFile(file: File) {
        const fileType: string = file.name.slice(file.name.indexOf('.') + 1);
        if (fileType.toLocaleLowerCase() !== 'xlsx') {
            this.toastService.showError('Only Excel file is allowed');
            return false;
        } else {
            return true;
        }
    }

    onUploadBtn() {
        let fd = new FormData();
        fd.append('avatar', this.file);
        this.laoderService.showLoader();
        this.peopleService.uploadFile(fd)
            .subscribe((res: any) => {
                this.laoderService.hideLoader();
                this.toastService.showSuccess('File Uploaded Successfully');
                this.file = null;
            }, (err: any) => {
                this.laoderService.hideLoader();
                this.toastService.showError(err.msg);
            });
    }
}
