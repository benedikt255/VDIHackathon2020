
import {Component, OnInit} from '@angular/core';
import { ConnectIngComment, ConnectIngPost, ConnectIngUser, ConnectIngBaseService } from '../adapter/base/AbstractBaseService';
import { Router } from '@angular/router';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['../app.component.css'],
})
export class CreatePostComponent {
  private baseService: ConnectIngBaseService;

  public postText: string;

  constructor(baseService: ConnectIngBaseService, private bottomSheetRef: MatBottomSheetRef<CreatePostComponent>) {
    this.baseService = baseService;
    this.postText = 'Please write in your post!';
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }


}
