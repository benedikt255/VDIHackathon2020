
import {CommentCtrl} from './CommentCtrl';
import {ChannelCtrl} from './ChannelCtrl';
import { ConnectIngBaseService, ConnectIngPost, ConnectIngUser, ConnectIngComment } from '../adapter/base/AbstractBaseService';

/**
 * Controller - PostCtrl
 * Application Controller to handle a post
 * and create/remove handling of comments
 */
export class PostCtrl {

  public currentUser: ConnectIngUser;
  public current: ConnectIngPost;
  public comments: Array<CommentCtrl>;
  // Management Interfaces
  private readonly baseService: ConnectIngBaseService;
  private readonly parent: ChannelCtrl;

  /**
   * Constructor - Post Controller
   * @param postMgmt Post Management
   * @param commentMgmt Comment Management
   * @param post Current Post
   * @param parent Channel Controller of Parent
   */
  constructor(baseService: ConnectIngBaseService, post: ConnectIngPost, parent: ChannelCtrl) {
    this.baseService = baseService;
    this.parent = parent;
    this.currentUser = this.parent.currentUser;
    this.current = post;
    this.comments = [];
    this.loadComments();
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
        this.comments = comments.map((value: ConnectIngComment, index: number, array: Array<ConnectIngComment>) => {
          return new CommentCtrl(this.baseService, this, value);
        });
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
        this.parent.loadPosts();
      } else {
        // failed
        // nop
      }
    });
  }
}
