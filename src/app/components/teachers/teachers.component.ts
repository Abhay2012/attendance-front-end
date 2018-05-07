import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../providers/address.service';
import { Teacher } from '../../models/people';
import { ToastService } from '../../providers/toast.service';
import { LoaderService } from '../../providers/loader.service';

declare const $;

@Component({
    selector: 'app-teachers',
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.scss'],
})

export class TeachersComponent implements OnInit {


    teacherList: Teacher[];

    // code related to teacher edit 
    teacherInModal: Teacher; // stores the teacher for whom edited btn has been pressed
    indexInModal: number; // stores the index of teacher for whom edited btn has been pressed
    editTeacherForm: FormGroup;

    constructor(
        private addressService: AddressService,
        private toastService: ToastService,
        private fb: FormBuilder,
        private loaderService: LoaderService
    ) { }

    ngOnInit() {
        this.addressService.role = 'teacher';
        this.getTeacherList();
        this.initEditForm();
    }

    getTeacherList() {
        this.loaderService.showLoader();
        this.addressService.getAddressList()
            .subscribe((list: Teacher[]) => {
                this.loaderService.hideLoader();
                this.teacherList = list;
                this.addressService.initializeAddressStore(list);
            }, (err: any) => {
                this.loaderService.hideLoader();                // show toast msg here
                this.toastService.showError(err.msg);
            });
    }

    onDelete(t: Teacher, index: number) {

        // take confirmation before deleting
        if (confirm('This handledare will be deleted !')) {
            this.loaderService.showLoader();
            this.addressService.deleteAddress(t.username)
                .subscribe((res: any) => {
                    this.loaderService.hideLoader();
                    this.addressService.deleteAddressFromStore(index);
                    this.toastService.showSuccess('Deleted Successfully');
                }, (err: any) => {
                    this.loaderService.hideLoader();
                    this.toastService.showError(err.msg);
                });
        }

    }

    onEdit(t: Teacher, index: number) {
        console.log(t);
        this.teacherInModal = t;
        this.indexInModal = index;
        this.initEditForm(t);
        $('#editModal').modal('show');
    }

    initEditForm(t?: Teacher) {
        this.editTeacherForm = this.fb.group({
            username: [t ? t.username : '', Validators.required],
            teacher: [t ? t.teacher : ''],
            password: [''],
            delStatus : [t ? t.delStatus : false]
        });
    }

    // getters for validtion errors
    // get teacher() { return this.editTeacherForm.get('teacher'); }
    get username() { return this.editTeacherForm.get('username'); }
    get password() { return this.editTeacherForm.get('password'); }
    get delStatus() { return this.editTeacherForm.get('delStatus'); }

    onEditSubmit() {

        if (this.username.value.trim().length === 0) {
            alert('Username can not be empty');
            return;
        }
        // check if there is no change in the data
        const usernameChanged = this.username.value.trim() !== this.teacherInModal.username
            , pwdChanged = this.password.value.trim() !== '',
            delStatusChanged = this.delStatus.value !== this.teacherInModal.delStatus;
        if (!usernameChanged && !pwdChanged&& !delStatusChanged) {
            alert('No information has been edited');
            return;
        }

        // construct the payload with teacher(mandatory) and only changed parameters
        const data: any = {
            teacher: this.teacherInModal.teacher,
            _id: this.teacherInModal._id
        };
        if (usernameChanged) {
            data['username'] = this.editTeacherForm.value.username;
        }
        if (pwdChanged) {
            data['password'] = this.editTeacherForm.value.password;
        }

        if (delStatusChanged) {
            data['delStatus'] = this.editTeacherForm.value.delStatus;
        }

        
        // finally send the request
        this.sendEditRequest(data);

    }

    sendEditRequest(data: any) {
        this.loaderService.showLoader();
        this.addressService.editAddress(data)
            .subscribe((res: any) => {
                this.loaderService.hideLoader();
                $('#editModal').modal('hide');
                this.addressService.editAddressInStore(this.indexInModal, {

                    _id: this.teacherInModal._id,
                    teacher: data.teacher,
                    username: data.username || this.teacherInModal.username,
                    password: data.password || this.teacherInModal.password,
                    delStatus : 'delStatus' in data ? data.delStatus : this.teacherInModal.delStatus
                });
                console.log(data.delStatus);
                this.toastService.showSuccess('Edited Successfully');
            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });

    }


}
