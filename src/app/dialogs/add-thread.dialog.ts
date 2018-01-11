// Angular
import { Component, OnInit, Inject, ViewChild } from '@angular/core';

// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ThreadService } from '../services/thread.service';

import { Observable } from 'rxjs';

@Component({
    selector: 'add-thread-dialog',
    templateUrl: './add-thread.dialog.html',
    styleUrls: ['./add-thread.dialog.css']
})

export class AddThreadDialog {
      

    threadTitle: string;

    constructor(
        public dialogRef: MatDialogRef<AddThreadDialog>,
        @Inject(MAT_DIALOG_DATA) public project: any,
        private threadService: ThreadService
    ){}
  
    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addThread() {
        this.threadService.addThread(this.threadTitle);
        this.onNoClick();
    }
}