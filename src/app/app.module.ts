import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';
import { DocThreadComponent } from './components/doc-thread/doc-thread.component';

import { ThreadService } from './services/thread.service';
import { DocumentService } from './services/document.service';

import { AddThreadDialog } from './dialogs/add-thread.dialog';

import { MaterialDesignModule } from './shared/mat.module';
import { PostComponent } from './components/post/post.component';
import { DocHitlistComponent } from './components/doc-hitlist/doc-hitlist.component';

@NgModule({
  declarations: [
    AppComponent,
    DocViewerComponent,
    DocThreadComponent,
    PostComponent,
    AddThreadDialog,
    DocHitlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialDesignModule,
    FormsModule,
    PdfViewerModule
  ],
  entryComponents: [
    AddThreadDialog
  ],
  providers: [
    ThreadService,
    DocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
