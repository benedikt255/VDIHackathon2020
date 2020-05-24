import {Component} from '@angular/core';
import {ConnectIngBaseService, ConnectIngComment} from '../adapter/base/AbstractBaseService';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['../app.component.css'],
})
export class CreateCommentComponent {
  public commentText: string;
  private baseService: ConnectIngBaseService;

  constructor(baseService: ConnectIngBaseService, private bottomSheetRef: MatBottomSheetRef<CreateCommentComponent>) {
    this.baseService = baseService;
    this.commentText = '';
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
        alert('Sorry, you are currently not connected.');
      } else {
        this.bottomSheetRef.dismiss();
        // Update Channel List
      }
    });
  }
}
