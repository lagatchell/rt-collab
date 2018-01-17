import { Component, OnInit } from '@angular/core';

import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {

  pdfSrc: string;

  constructor(
    private documentService: DocumentService
  ) { }

  ngOnInit() {
    this.documentService.currentDocument$.subscribe((doc) => {
      if(doc) {
        this.pdfSrc = doc.docUrl;
      }
      else {
        this.pdfSrc = null;
      }
    });
  }

}
