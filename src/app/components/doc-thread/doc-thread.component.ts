import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ThreadService } from '../../services/thread.service';

import { AddThreadDialog } from '../../dialogs/add-thread.dialog';

import { Thread } from '../../models/thread';
import { Post } from '../../models/post';
import { DocumentService } from '../../services/document.service';
 
@Component({
  selector: 'doc-thread',
  templateUrl: './doc-thread.component.html',
  styleUrls: ['./doc-thread.component.css']
})
export class DocThreadComponent implements OnInit {
  
  loadingThreads: boolean = true;
  threads: Array<Thread>;
  currentThread: Thread;
  threadSelected: boolean = false;
  threadPosts: Array<Post>;
  postContent: string;
  
  constructor(
    private threadService: ThreadService,
    private documentService: DocumentService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getThreads();
  }

  getThreads() {
    this.documentService.currentDocument$.subscribe((document) => {
        this.threadService.getThreadsInitial(document.id).subscribe((threads: any) => {
          this.threads = threads;
          this.loadingThreads = false;
        }); 

        this.threadService.getThreads(document.id).subscribe((threads: Array<Thread>) => {
          this.threads = threads;
          this.loadingThreads = false;
        });
    });
  }

  getPosts(thread: Thread) {
    this.currentThread = thread;

    this.threadService.getPostsInitial(thread.threadId).subscribe((posts: Array<Post>) => {
      this.threadPosts = posts;
      this.threadSelected = true;
    });

    this.threadService.getPosts(thread.threadId).subscribe((posts) => {
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

      console.log(post);
  
      this.threadService.addPost(post);
      this.postContent = null;
    }
  }

  newThread() {
    let dialogRef = this.dialog.open(AddThreadDialog, {
        height: '200px',
        width: '300px',
        data: {}
    });
  }

}
