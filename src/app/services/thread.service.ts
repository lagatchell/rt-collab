import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import * as signalR from '@aspnet/signalr-client';

import { DocumentService } from './document.service';

import { Thread } from '../models/thread';
import { Post } from '../models/post';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

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
    this.documentId = documentId;
    return this.http.get(`${this.baseUrl}/api/threads/${documentId}`);
  }

  getThreads(documentId: string) {

    this.connection.on("GetThreads", threads => {
        threads = JSON.parse(threads);
        console.log(threads);
        console.log(documentId);
        if (threads.length > 0) {
          if (threads[0].documentId == documentId) {
            this.threads$.next(threads);
          }
        }
    });

    return this.threads$;
  }

  getPostsInitial(thread: Thread) {
    return this.http.get(`${this.baseUrl}/api/posts/${thread.threadId}`);
  }

  getPosts(thread: Thread) {
    this.connection.on("GetPosts", (posts) => {
        posts = JSON.parse(posts);
        
        if (posts.length > 0) {
          console.log(posts);
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

    console.log(newPost);

    this.http.post(`${this.baseUrl}/api/posts/${post.threadId}`, newPost).subscribe((data) => {
      console.log(data);
    });
  }

  addThread(threadTitle) {
    
    let newThread: Thread = {
      title: threadTitle,
      posts: []
    };

    this.http.post(`${this.baseUrl}/api/threads/${this.documentId}`, newThread).subscribe((data: any) => {
      console.log(data);
    });
  }
}
