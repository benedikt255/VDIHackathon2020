import {Component} from '@angular/core';
import {ConnectIngBaseService, ConnectIngPost} from '../adapter/base/AbstractBaseService';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['../app.component.css'],
})
export class CreatePostComponent {
  public postText: string;
  public postTitle: string;
  private baseService: ConnectIngBaseService;

  constructor(baseService: ConnectIngBaseService, private bottomSheetRef: MatBottomSheetRef<CreatePostComponent>) {
    this.baseService = baseService;
    this.postText = 'Please write in your post!';
    this.postTitle = 'Please enter your title';
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

    /**
   * Method - Create a new Comment
   * @param text Comment Text
   */
  public createPost(text: string, title:string) {
    this.baseService.createPostAsync(this.baseService.currentUser,this.baseService.currentChannel, title, text, (comment: ConnectIngPost) => {
      if (comment === ConnectIngPost.GetDefault()) {
        // Create failed
        // nop
      } else {
        // Create successfull
        // Update Channel List
      }
    });
  }


}
