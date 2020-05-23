import {ConnectIngPost, IPost, IPostMgmt} from '../interface/IPostMgmt';
import {ConnectIngComment, IComment, ICommentMgmt} from '../interface/ICommentMgmt';
import {ConnectIngUser, IUser} from '../interface/IUserMgmt';
import {IChannel} from '../interface/IChannelMgmt';
import {CommentCtrl} from './CommentCtrl';

/**
 * Controller - PostCtrl
 * Application Controller to handle a post
 * and create/remove handling of comments
 */
export class PostCtrl {

  // Management Interfaces
  private readonly postMgmt: IPostMgmt;
  private readonly commentMgmt: ICommentMgmt;

  public curUser: IUser;
  public parentChannel: IChannel;
  public cur: IPost;
  public comments: Array<CommentCtrl>;

  constructor(postMgmt: IPostMgmt, post: IPost, chnMgmt: ICommentMgmt, parentChannel: IChannel){
    this.postMgmt = postMgmt;
    this.parentChannel = parentChannel;
    this.commentMgmt = chnMgmt;
    this.curUser = ConnectIngUser.GetDefault();
    this.cur = post;
    this.comments = [];
    this.loadComments();
  }

  public loadComments(): void {
    this.commentMgmt.getCommentsAsync(this.curUser, this.cur, (comments: Array<IComment>) => {
      if (comments === undefined) {
        // failed
        // nop
      } else {
        // successfull
        this.comments = comments.map((value: IComment, index: number, array: Array<IComment>) => {
          return new CommentCtrl(this.commentMgmt, this.curUser, value);
        });
      }
    });
  }

  public updatePost(post: IPost, text: string) {
    this.postMgmt.updatePostAsync(this.curUser, this.cur, text, (updatedPost: IPost) => {
      if (post === ConnectIngPost.GetDefault())
      {
        // Undefined -> error in call
        // nop
      }
      else
      {
        this.cur = updatedPost;
        this.loadComments();
      }
    });
  }

  public createComment(text: string)
  {
    this.commentMgmt.createCommentAsync(this.curUser, this.cur, text,  (comment: IComment) => {
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

  public removePost(post: IPost) {
    this.postMgmt.removePostAsync(this.CurrentUser, post, (removed: boolean) => {
      if (removed)
      {
        // successfull
        this.loadPosts();
      }
      else
      {
        // failed
        // nop
      }
    });
  }
}
