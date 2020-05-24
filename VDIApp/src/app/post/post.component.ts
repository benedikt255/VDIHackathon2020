import {Component, OnInit} from '@angular/core';
import { ConnectIngComment, ConnectIngPost, ConnectIngUser, ConnectIngBaseService } from '../adapter/base/AbstractBaseService';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { CreateCommentComponent } from './create-comment.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../app.component.css'],
})
export class PostComponent implements OnInit {

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };


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
    this.bottomSheet.open(CreateCommentComponent).afterDismissed().subscribe(() => { this.loadComments(); });
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





/**
 * Method to GoBack to Channel View
 */
public GoBack(): void{
  this.baseService.currentComment = ConnectIngComment.GetDefault();
  this.baseService.currentPost = ConnectIngPost.GetDefault();
  this.router.navigate(['/channel']);
}




/**
 * Method to recognize swipe features
 * @param action
 */
public swipe(action = this.SWIPE_ACTION.RIGHT) {
  if (action === this.SWIPE_ACTION.RIGHT) {
    this.GoBack();
  }

  // swipe left, previous avatar
  if (action === this.SWIPE_ACTION.LEFT) {

  }

}




}

