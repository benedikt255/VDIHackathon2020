import { Component, OnInit } from '@angular/core';
import { ConnectIngComment, ConnectIngBaseService, ConnectIngUser } from '../adapter/base/AbstractBaseService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['../app.component.css']
})
export class CommentComponent implements OnInit {

  private baseService: ConnectIngBaseService;
  private router: Router;

  public currentUser: ConnectIngUser;
  public current: ConnectIngComment;


  constructor(baseService: ConnectIngBaseService, router: Router) {
    this.baseService = baseService;
    this.router = router;
    this.currentUser = this.baseService.currentUser;
    this.current =  this.baseService.currentComment;
  }

  ngOnInit(): void {
  }


  /**
   * Method - Update Comment
   * @param comment Comment Object
   */
  public updateComment(comment: ConnectIngComment) {
    this.baseService.updateCommentAsync(this.currentUser, comment, (newComment: ConnectIngComment) => {
      if (newComment === ConnectIngComment.GetDefault()) {
        // failed
        // nop
      } else {
        // successfull
        this.current = newComment;
      }
    });
  }

  /**
   * Method - Remove Comment
   */
  public removeComment() {
    this.baseService.removeCommentAsync(this.currentUser, this.current, (removed: boolean) => {
      if (removed) {
        // successfull
        this.router.navigate(['/post']);
      } else {
        // failed
        // nop
      }
    });
  }


}
