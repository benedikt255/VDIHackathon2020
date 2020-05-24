
import {Component, OnInit} from '@angular/core';
import { ConnectIngComment, ConnectIngPost, ConnectIngUser, ConnectIngBaseService } from '../adapter/base/AbstractBaseService';
import { Router } from '@angular/router';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['../app.component.css'],
})
export class CreateCommentComponent {
  private baseService: ConnectIngBaseService;

  public commentText: string;

  constructor(baseService: ConnectIngBaseService, private bottomSheetRef: MatBottomSheetRef<CreateCommentComponent>) {
    this.baseService = baseService;
    this.commentText = 'Please write in your comment!';
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  /**
   * Method - Create a new Comment
   * @param text Comment Text
   */
  public createComment(text: string) {
    this.baseService.createCommentAsync(this.baseService.currentUser, this.baseService.currentPost, text, (comment: ConnectIngComment) => {
      if (comment === ConnectIngComment.GetDefault()) {
        // Create failed
        // nop
      } else {
        // Create successfull
        // Update Channel List
      }
    });
  }
}
