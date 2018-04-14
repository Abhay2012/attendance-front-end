import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../providers/toast.service';
import { LoaderService } from '../../providers/loader.service';
import { AbsentMessageService } from '../../providers/absent-message.service';

declare const $;

@Component({
    selector: 'app-absent-messages',
    templateUrl: './absentMessages.component.html',
})

export class AbsentMessagesComponent implements OnInit {


    absentMessageList: any[];

    // code related to absentMessage edit 
    absentMessageInModal: any; // stores the absentMessage for whom edited btn has been pressed
    indexInModal: number; // stores the index of absentMessage for whom edited btn has been pressed
    editAbsentMessageForm: FormGroup;

    constructor(
        private absentMessageService: AbsentMessageService,
        private toastService: ToastService,
        private fb: FormBuilder,
        private loaderService: LoaderService
    ) { }

    ngOnInit() {
        this.getAbsentMessageList();
        this.initEditForm();
    }

    getAbsentMessageList() {
        this.loaderService.showLoader();
        this.absentMessageService.getAbsentMessageList()
            .subscribe((res: any) => {
                this.loaderService.hideLoader();
                this.absentMessageList = res.data;
                this.absentMessageService.initializeAbsentMessageStore(res);
            }, (err: any) => {
                this.loaderService.hideLoader();                // show toast msg here
                this.toastService.showError(err.msg);
            });
    }

    onDelete(msg: any, index: number) {

        // take confirmation before deleting
        if (confirm('This absent message will be deleted !')) {
            this.loaderService.showLoader();
            this.absentMessageService.deleteAbsentMessage(msg._id)
                .subscribe((res: any) => {
                    this.loaderService.hideLoader();
                    this.absentMessageService.deleteAbsentMessageFromStore(index);
                    this.toastService.showSuccess('Deleted Successfully');
                }, (err: any) => {
                    this.loaderService.hideLoader();
                    this.toastService.showError(err.msg);
                });
        }

    }

    onEdit(add: any, index: number) {
        this.absentMessageInModal = add;
        this.indexInModal = index;
        this.initEditForm(add);
        $('#editModal').modal('show');
    }

    initEditForm(add?: any) {
        this.editAbsentMessageForm = this.fb.group({
            message: [add ? add.message : ''],
        });
    }

    // getters for validtion errors
    get absentMessage() { return this.editAbsentMessageForm.get('message'); }

    onEditSubmit() {

        if (this.absentMessage.value.trim().length === 0) {
            alert('Message can not be empty');
            return;
        }
        // check if there is no change in the data
        const absentMessageChanged = this.absentMessage.value.trim() !== this.absentMessageInModal.message;

        if (!absentMessageChanged) {
            alert('Message is unchanged');
            return;
        }

        // construct the payload with address(mandatory) and only changed parameters
        const data: any = {
            message: this.absentMessage.value,
            _id: this.absentMessageInModal._id
        };
        // finally send the request
        this.sendEditRequest(data);

    }

    sendEditRequest(data: any) {
        this.loaderService.showLoader();
        this.absentMessageService.editAbsentMessage(data)
            .subscribe((res: any) => {
                this.loaderService.hideLoader();
                $('#editModal').modal('hide');
                this.absentMessageService.editAbsentMessageInStore(this.indexInModal, {

                    _id: this.absentMessageInModal._id,
                    message: data.message,
                });
                this.toastService.showSuccess('Edited Successfully');
            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });

    }


}
    