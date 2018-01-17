import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatFormField } from '@angular/material';

import { ThreadService } from '../../services/thread.service';

import { AddThreadDialog } from '../../dialogs/add-thread.dialog';

import { Thread } from '../../models/thread';
import { Post } from '../../models/post';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document';
 
@Component({
  selector: 'doc-thread',
  templateUrl: './doc-thread.component.html',
  styleUrls: ['./doc-thread.component.css']
})
export class DocThreadComponent implements OnInit {
  
  currentDocument: Document = null;
  loadingThreads: boolean = true;
  threads: Array<Thread>;
  currentThread: Thread;
  threadSelected: boolean = false;
  threadPosts: Array<Post>;
  postContent: string;
  addThreadDisabled: boolean = true;
  threadTitle: string;
  addNewThread: boolean = false;
  
  constructor(
    private threadService: ThreadService,
    private documentService: DocumentService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getThreads();
  }

  getThreads() {
    this.documentService.currentDocument$.subscribe((document: Document) => {

      if (document) {
        this.threadService.getThreadsInitial(document.id).subscribe((threads: Array<Thread>) => {
          this.threads = threads;
          this.loadingThreads = false;
        }); 

        this.threadService.getThreads(document.id).subscribe((threads: Array<Thread>) => {
          this.threads = threads;
          this.loadingThreads = false;
        });

        if (!this.currentDocument || this.currentDocument.id != document.id) {
          this.currentDocument = document;
          this.returnToThreadList();
        }

        this.addThreadDisabled = false;
      }
      else {
        this.threads = [];
        this.addThreadDisabled = true;
      }
      this.clearThreadField();
    });
  }

  getPosts(thread: Thread) {
    this.currentThread = thread;

    this.threadService.getPostsInitial(thread).subscribe((posts: Array<Post>) => {
      this.threadPosts = posts;
      this.threadSelected = true;
    });

    this.threadService.getPosts(thread).subscribe((posts: Array<Post>) => {
      this.threadPosts = posts;
      this.threadSelected = true;
    });
  }

  returnToThreadList() {
    this.threadSelected = false;
    this.currentThread = null;
  }

  addPost() {
    if (this.postContent) {

      let post: Post = {
        threadId: this.currentThread.threadId,
        content: this.postContent
      };
  
      this.threadService.addPost(post);
      this.postContent = null;
    }
  }

  newThread() {
    this.addNewThread = true;
    setTimeout(()=>{
      let addNewThreadField = document.getElementById("threadTitle");
      addNewThreadField.focus();
      addNewThreadField.addEventListener("blur", ()=> {
        this.clearThreadField();
      });
    }, 1);
  }

  addThread() {
    if (this.threadTitle) {
      this.threadService.addThread(this.threadTitle);
      this.clearThreadField();
    }
  }

  clearThreadField() {
    this.addNewThread = false;
    this.threadTitle = null;
  }
}
