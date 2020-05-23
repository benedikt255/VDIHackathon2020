import {ConnectIngPost, IPost, IPostMgmt} from '../interface/IPostMgmt';
import {IComment, ICommentMgmt} from '../interface/ICommentMgmt';
import {ConnectIngUser, IUser} from '../interface/IUserMgmt';
import {IChannel} from '../interface/IChannelMgmt';

export class PostCtrl {

  // Management Interfaces
  private readonly postMgmt: IPostMgmt;
  private readonly commentMgmt: ICommentMgmt;

  public curUser: IUser;
  public parentChannel: IChannel;
  public cur: IPost;

  constructor(postMgmt: IPostMgmt, chnMgmt: ICommentMgmt, parentChannel: IChannel){
    this.postMgmt = postMgmt;
    this.parentChannel = parentChannel;
    this.commentMgmt = chnMgmt;
    this.curUser = ConnectIngUser.GetDefault();
    this.cur = ConnectIngPost.GetDefault();
  }

  public updatePost(post: IPost, text: string, callback: (post: IPost) => void): void {
    this.postMgmt.updatePostAsync(this.curUser, this.cur, text, (updatedPost: IPost) => {
      if (post === ConnectIngPost.GetDefault())
      {
        // Undefined -> error in call
        this.cur = ConnectIngPost.GetDefault();
      }
      else
      {
        this.cur = updatedPost;
      }
    });
  }

  public createComment(title: string, message: string)
  {
    this.commentMgmt.createCommentAsync(this.curUser, this.parentChannel, title, message, (comment: IComment) => {
      if (post === ConnectIngPost.GetDefault())
      {
        // Create failed
        // nop
      }
      else
      {
        // Create successfull
        // Update Channel List
        this.cur = post;
      }
    });
  }

  public removeComment(user: IUser, comment: IPost, callback: (removed: boolean) => void): void {
    this.commentMgmt.removeCommentAsync(this.curUser, this.cur, (removed: boolean) => {
      if (removed)
      {
        // remove successful
        // update channel List
        this.cur = ConnectIngPost.GetDefault();
      }
      else
      {
        // remove failed
        // nop
      }
    });
  }
}
