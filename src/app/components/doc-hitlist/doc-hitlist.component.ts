import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { 
  MatPaginator, 
  MatTableDataSource, 
  MatSort, 
  MatDialog,
  Sort 
} from '@angular/material';

import { Document } from '../../models/document';
import { DocumentService } from '../../services/document.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'doc-hitlist',
  templateUrl: './doc-hitlist.component.html',
  styleUrls: ['./doc-hitlist.component.css']
})
export class DocHitlistComponent implements OnInit, AfterViewInit {

  documents: Array<Document> = [];
  dataSource: MatTableDataSource<any>;
  displayedColumnKeys = ['documentName', 'documentDate'];
  displayedColumns = [
      {
          id: 'documentName',
          display: 'Document Name',
          type: 'string'
      },
      {
          id: 'documentDate',
          display: 'Document Date',
          type: 'date'
      }
  ];

  constructor(
    private documentService: DocumentService
  ) { }

  ngOnInit() {
    this.getDocuments();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  getDocuments() {
    this.documentService.getDocuments().subscribe((docs) => {
      this.documents = docs;
      this.dataSource = new MatTableDataSource<any>(docs);
    });
  }

  openDocument(doc: Document) {
    this.documentService.setCurrentDocument(doc);
    this.selectRow(doc.id, true);
  }

  applyFilter(filterValue: string)
  {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
  }

  selectRow(rowId, clearOtherRows: boolean) {
    let row = document.getElementById('doc-' + rowId);
    row.className = "data-row mat-row ng-star-inserted row-selected";

    if (clearOtherRows) {
      this.clearRowSelections(rowId);
    }
  }

  clearRowSelections(rowId?) {
    if (rowId) {
      for (let i=0; i<this.documents.length; i++) {
        if (this.documents[i].id != rowId) {
          let otherRow = document.getElementById('doc-' + this.documents[i].id);
          otherRow.className = "data-row mat-row ng-star-inserted";
        }
      }
    }
    else {
      for (let i=0; i<this.documents.length; i++) {
        let otherRow = document.getElementById('doc-' + this.documents[i].id);
        otherRow.className = "data-row mat-row ng-star-inserted";
      }
      this.documentService.currentDocument$.next(null);
    }
  }
}
