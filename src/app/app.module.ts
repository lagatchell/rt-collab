import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';
import { DocThreadComponent } from './components/doc-thread/doc-thread.component';

import { ThreadService } from './services/thread.service';
import { DocumentService } from './services/document.service';

import { EditThreadDialog } from './dialogs/edit-thread.dialog';

import { MaterialDesignModule } from './shared/mat.module';
import { PostComponent } from './components/post/post.component';
import { DocHitlistComponent } from './components/doc-hitlist/doc-hitlist.component';

@NgModule({
  declarations: [
    AppComponent,
    DocViewerComponent,
    DocThreadComponent,
    PostComponent,
    EditThreadDialog,
    DocHitlistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialDesignModule,
    FormsModule,
    PdfViewerModule
  ],
  entryComponents: [
    EditThreadDialog
  ],
  providers: [
    ThreadService,
    DocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
