import { Component, OnInit } from '@angular/core';

import { DocumentService } from './services/document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading: boolean = true;

  constructor(
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    setTimeout(()=>{
      this.isLoading = false;
    }, 1000);
  }

}
