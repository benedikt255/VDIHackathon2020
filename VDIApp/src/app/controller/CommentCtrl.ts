import { ICommentMgmt, IComment, ConnectIngComment } from '../interface/ICommentMgmt';
import { IUser } from '../interface/IUserMgmt';


/**
 * Controller - CommentCtrl
 * Application Controller to handle a comment
 */
export class CommentCtrl
{

    private readonly commentMgmt: ICommentMgmt;

    public CurrentUser: IUser;
    public Current: IComment;

    constructor(commentMgmt: ICommentMgmt, user: IUser, comment: IComment)
    {
        this.commentMgmt = commentMgmt;
        this.CurrentUser = user;
        this.Current = comment;
    }


    public updateComment(comment: IComment)
    {
        this.commentMgmt.updateCommentAsync(this.CurrentUser, comment, (newComment: IComment) => {
            if (newComment === ConnectIngComment.GetDefault())
            {
                // failed
                // nop
            }
            else
            {
                // successfull
                this.Current = newComment;
            }
        });
    }

}