import { Injectable } from '@angular/core';

import { Document } from '../models/document';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DocumentService {

  documents: Array<Document> = [
    {
      id: '1',
      documentName: 'Web Formers',
      documentDate: new Date('1/9/2018'),
      docUrl: './assets/images/web-formers.pdf'

    },
    {
      id: '2',
      documentName: 'Test Document 1',
      documentDate: new Date('1/10/2018'),
      docUrl: './assets/images/test-doc1.pdf'
    },
    {
      id: '3',
      documentName: 'Test Document 2',
      documentDate: new Date('1/10/2018'),
      docUrl: './assets/images/test-doc2.pdf'
    }
  ];

  currentDocument: Document = this.documents[0];

  documents$: BehaviorSubject<Array<Document>> = new BehaviorSubject(this.documents);

  currentDocument$: Subject<Document> = new Subject();

  constructor() { }

  getDocuments() {
    return this.documents$;
  }

  setCurrentDocument(document: Document) {
    this.currentDocument$.next(document);
  }

}
