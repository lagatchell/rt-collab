import { Component, OnInit, ViewChild } from '@angular/core';

import { 
  MatPaginator, 
  MatTableDataSource, 
  MatSort, 
  MatDialog,
  Sort 
} from '@angular/material';

import { Document } from '../../models/document';

import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'doc-hitlist',
  templateUrl: './doc-hitlist.component.html',
  styleUrls: ['./doc-hitlist.component.css']
})
export class DocHitlistComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumnKeys = ['documentName', 'documentDate'];
  displayedColumns = [
      {
          id: 'documentName',
          display: 'Document Name'
      },
      {
          id: 'documentDate',
          display: 'Document Date'
      }
  ];

  constructor(
    private documentService: DocumentService
  ) { }

  ngOnInit() {
    this.getDocuments();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  getDocuments() {
    this.documentService.getDocuments().subscribe((docs) => {
      this.dataSource = new MatTableDataSource<any>(docs);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
    });

    this.documentService.updateDocuments();
  }

  openDocument(document: Document) {
    this.documentService.setCurrentDocument(document);
  }

  applyFilter(filterValue: string)
  {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
  }
}
