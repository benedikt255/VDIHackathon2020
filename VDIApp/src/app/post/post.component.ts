import {Component, OnInit} from '@angular/core';
import { ConnectIngComment, ConnectIngPost, ConnectIngUser, ConnectIngBaseService } from '../adapter/base/AbstractBaseService';
import { Router } from '@angular/router';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../app.component.css'],
})
export class PostComponent implements OnInit {

  private baseService: ConnectIngBaseService;
  private router: Router;

  public currentUser: ConnectIngUser;
  public current: ConnectIngPost;
  public comments: ConnectIngComment[];

  constructor(baseService: ConnectIngBaseService, router: Router, private bottomSheet: MatBottomSheet) {
  this.baseService = baseService;
  this.router = router;
  this.currentUser = this.baseService.currentUser;
  this.current =  this.baseService.currentPost;
  this.comments = [];
  this.bottomSheet = bottomSheet;



  this.loadComments();
  }

  ngOnInit(): void {
  }



  openCommentPanel(): void {
    this.bottomSheet.open(CreateCommentComponent);
  }


  public GoTo(comment: string): void
  {
      if(comment === undefined) { return; }
      this.baseService.currentComment = this.comments.filter(value => value.id === comment)[0];
      this.router.navigate(['/comment']);
  }

  /**
   * Method - Load Comments of Post
   */
  public loadComments(): void {
    this.baseService.getCommentsAsync(this.currentUser, this.current, (comments: Array<ConnectIngComment>) => {
      if (comments === undefined) {
        // failed
        // nop
      } else {
        // successfull
        this.comments = comments;
        }
    });
    }


  /**
   * Method - Update the Post
   * @param post Update Object
   */
  public updatePost(post: ConnectIngPost) {
    this.baseService.updatePostAsync(this.currentUser, post, (updatedPost: ConnectIngPost) => {
      if (updatedPost === ConnectIngPost.GetDefault()) {
        // Undefined -> error in call
        // nop
      } else {
        this.current = updatedPost;
        this.loadComments();
      }
    });
  }

  /**
   * Method - Create a new Comment
   * @param text Comment Text
   */
  public createComment(text: string) {
    this.baseService.createCommentAsync(this.currentUser, this.current, text, (comment: ConnectIngComment) => {
      if (comment === ConnectIngComment.GetDefault()) {
        // Create failed
        // nop
      } else {
        // Create successfull
        // Update Channel List
        this.loadComments();
      }
    });
  }

  /**
   * Method - Remove the current Post
   */
  public removePost() {
    this.baseService.removePostAsync(this.currentUser, this.current, (removed: boolean) => {
      if (removed) {
        // successfull
      } else {
        // failed
        // nop
      }
    });
  }







  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };




// action triggered when user swipes
swipe(action = this.SWIPE_ACTION.RIGHT) {
  // swipe right, next avatar
  alert("action");

  if (action === this.SWIPE_ACTION.RIGHT) {
    console.log('Swipe RIGHT');
    alert("RIGHT");
  }

  // swipe left, previous avatar
  if (action === this.SWIPE_ACTION.LEFT) {
      console.log('Swipe LEFT');
      alert("LEFT");
  }

}




}

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['../app.component.css'],
})
export class CreateCommentComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<CreateCommentComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
