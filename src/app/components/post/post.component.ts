import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../../models/post';

@Component({
  selector: 'thread-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  timeStamp: string = "";

  constructor() { }

  @Input() post: Post;

  ngOnInit() {
    this.formatPostTimeStamp();
  }

  formatPostTimeStamp() {
    let postTimeStamp = new Date(this.post.timeStamp);
    let currentDate = new Date().toDateString();

    if (currentDate === postTimeStamp.toDateString()) {
      let hour = postTimeStamp.getHours() + 1;
      let minutes = postTimeStamp.getMinutes();
      let timeDesignator: string = "AM";
      let displayHour = hour.toString();
      let displayMinutes = minutes.toString();

      if (hour >= 12) {
        timeDesignator = "PM";
      }

      if (hour > 12) {
        displayHour = (hour - 12).toString();
      }

      if (displayMinutes.length === 1) {
        displayMinutes = "0" + displayMinutes;
      }

      this.timeStamp = `${displayHour}:${displayMinutes} ${timeDesignator}`;
    }
    else {
      this.timeStamp = postTimeStamp.toDateString()
    }
  }

}
