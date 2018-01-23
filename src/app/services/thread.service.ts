import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { createSignalRHub  } from 'rxjs-signalr';
import * as signalR from '@aspnet/signalr-client';

import { DocumentService } from './document.service';

import { Thread } from '../models/thread';
import { Post } from '../models/post';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { HeaderRowPlaceholder } from '@angular/cdk/table';

@Injectable()
export class ThreadService {

  baseUrl: string = `http://dev-036296:5000`;

  documentId: string = '1';

  posts$: Subject<Array<Post>> = new Subject();
  threads$: Subject<Array<Thread>> = new Subject();

  connection: any;

  constructor(
    private documentService: DocumentService,
    public http: HttpClient
  ) {
    this.setupSignalRConnection();
  }

  setupSignalRConnection() {
    this.connection = new signalR.HubConnection(`${this.baseUrl}/CollaborationHub/`);

    this.connection.start({ withCredentials: false }).then(
        () => this.connection.invoke("Send", "Hello")
    );
  }

  getThreadsInitial(documentId: string) {
    return this.http.get(`${this.baseUrl}/api/threads/${documentId}`);
  }

  getThreads() {
    this.connection.on("GetThreads", threads => {
        threads = JSON.parse(threads);
        this.threads$.next(threads);
    });

    return Observable.combineLatest(this.threads$, this.documentService.currentDocument$)
    .filter(([threads, document]) => {
      return threads.some(thread => thread.documentId == document.id);
    })
    .map(([threads, document]) => {
      return threads;
    });

  }

  getPostsInitial(thread: Thread) {
    return this.http.get(`${this.baseUrl}/api/posts/${thread.threadId}`);
  }

  getPosts(thread: Thread) {
    this.connection.on("GetPosts", (posts) => {
        posts = JSON.parse(posts);
        
        if (posts.length > 0) {
          if (posts[0].threadId == thread.threadId) {
            this.posts$.next(posts);
          }
        }
    });

    return this.posts$;
  }

  addPost(post: Post) {

    let newPost: Post = {
      content: post.content,
      userName: location.host
    };

    this.http.post(`${this.baseUrl}/api/posts/${post.threadId}`, newPost).subscribe((data) => {
      console.log(data);
    });
  }

  addThread(threadTitle, docID) {
    
    let newThread: Thread = {
      title: threadTitle,
      posts: []
    };

    this.http.post(`${this.baseUrl}/api/threads/${docID}`, newThread).subscribe((data: any) => {
      console.log(data);
    });
  }

  updateThread(thread: Thread) {
    this.http.put(`${this.baseUrl}/api/threads/${thread.threadId}`, thread).subscribe((data: any) => {
      console.log(data);
    });
  }
}
