import {PostCtrl} from './PostCtrl';
import { ConnectIngUser, ConnectIngComment, ConnectIngBaseService } from '../adapter/base/AbstractBaseService';
import { Injectable } from '@angular/core';


/**
 * Controller - CommentCtrl
 * Application Controller to handle a comment
 */
@Injectable({
  providedIn: 'root'
})
export class CommentCtrl {

  public currentUser: ConnectIngUser;
  public current: ConnectIngComment;
  private readonly baseService: ConnectIngBaseService;
  private readonly parent: PostCtrl;

  /**
   * Constructor - Comment Controller
   * @param commentMgmt Comment Management
   * @param parent Parent Post Controller
   * @param comment Comment Object
   */
  constructor(baseService: ConnectIngBaseService, parent: PostCtrl, comment: ConnectIngComment) {
    this.baseService = baseService;
    this.parent = parent;
    this.currentUser = this.parent.currentUser;
    this.current = comment;
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
        this.parent.loadComments();
      } else {
        // failed
        // nop
      }
    });
  }


}
