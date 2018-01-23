// Angular
import { Component, OnInit, Inject, ViewChild } from '@angular/core';

// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ThreadService } from '../services/thread.service';

import { Observable } from 'rxjs';
import { Thread } from '../models/thread';

@Component({
    selector: 'edit-thread-dialog',
    templateUrl: './edit-thread.dialog.html',
    styleUrls: ['./edit-thread.dialog.css']
})

export class EditThreadDialog {
      
    constructor(
        public dialogRef: MatDialogRef<EditThreadDialog>,
        @Inject(MAT_DIALOG_DATA) public thread: Thread,
        private threadService: ThreadService
    ){}
  
    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    deleteThread() {
        this.onNoClick();
    }

    updateThread() {
        this.threadService.updateThread(this.thread);
        this.onNoClick();
    }
}