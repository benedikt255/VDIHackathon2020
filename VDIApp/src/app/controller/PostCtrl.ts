import {ConnectIngPost, IPost, IPostMgmt} from '../interface/IPostMgmt';
import {ConnectIngComment, IComment, ICommentMgmt} from '../interface/ICommentMgmt';
import {IUser} from '../interface/IUserMgmt';
import {CommentCtrl} from './CommentCtrl';
import { ChannelCtrl } from './ChannelCtrl';

/**
 * Controller - PostCtrl
 * Application Controller to handle a post
 * and create/remove handling of comments
 */
export class PostCtrl {

  // Management Interfaces
  private readonly postMgmt: IPostMgmt;
  private readonly commentMgmt: ICommentMgmt;

  private readonly parent: ChannelCtrl;

  public currentUser: IUser;
  public current: IPost;
  public comments: Array<CommentCtrl>;

  /**
   * Constructor - Post Controller
   * @param postMgmt Post Management
   * @param commentMgmt Comment Management
   * @param post Current Post
   * @param parent Channel Controller of Parent
   */
  constructor(postMgmt: IPostMgmt, commentMgmt: ICommentMgmt, post: IPost, parent: ChannelCtrl){
    this.postMgmt = postMgmt;
    this.parent = parent;
    this.commentMgmt = commentMgmt;
    this.currentUser = this.parent.currentUser;
    this.current = post;
    this.comments = [];
    this.loadComments();
  }

  /**
   * Method - Load Comments of Post
   */
  public loadComments(): void {
    this.commentMgmt.getCommentsAsync(this.currentUser, this.current, (comments: Array<IComment>) => {
      if (comments === undefined) {
        // failed
        // nop
      } else {
        // successfull
        this.comments = comments.map((value: IComment, index: number, array: Array<IComment>) => {
          return new CommentCtrl(this.commentMgmt, this, value);
        });
      }
    });
  }

  /**
   * Method - Update the Post
   * @param post Update Object
   */
  public updatePost(post: IPost) {
    this.postMgmt.updatePostAsync(this.currentUser, post, (updatedPost: IPost) => {
      if (updatedPost === ConnectIngPost.GetDefault())
      {
        // Undefined -> error in call
        // nop
      }
      else
      {
        this.current = updatedPost;
        this.loadComments();
      }
    });
  }

  /**
   * Method - Create a new Comment
   * @param text Comment Text
   */
  public createComment(text: string)
  {
    this.commentMgmt.createCommentAsync(this.currentUser, this.current, text,  (comment: IComment) => {
      if (comment === ConnectIngComment.GetDefault())
      {
        // Create failed
        // nop
      }
      else
      {
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
    this.postMgmt.removePostAsync(this.currentUser, this.current, (removed: boolean) => {
      if (removed)
      {
        // successfull
        this.parent.loadPosts();
      }
      else
      {
        // failed
        // nop
      }
    });
  }
}
