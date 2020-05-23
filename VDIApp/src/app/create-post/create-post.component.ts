import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['../app.component.css'],
})
export class CreatePostComponent implements OnInit {

  panelOpenState = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}



