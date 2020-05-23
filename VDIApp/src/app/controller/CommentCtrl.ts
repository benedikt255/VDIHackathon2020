import { ICommentMgmt, IComment, ConnectIngComment } from '../interface/ICommentMgmt';
import { IUser } from '../interface/IUserMgmt';
import { PostCtrl } from './PostCtrl';


/**
 * Controller - CommentCtrl
 * Application Controller to handle a comment
 */
export class CommentCtrl
{

    private readonly commentMgmt: ICommentMgmt;

    private readonly parent: PostCtrl;

    public currentUser: IUser;
    public current: IComment;

    /**
     * Constructor - Comment Controller
     * @param commentMgmt Comment Management
     * @param parent Parent Post Controller
     * @param comment Comment Object
     */
    constructor(commentMgmt: ICommentMgmt, parent: PostCtrl, comment: IComment)
    {
        this.commentMgmt = commentMgmt;
        this.parent = parent;
        this.currentUser = this.parent.currentUser;
        this.current = comment;
    }

    /**
     * Method - Update Comment
     * @param comment Comment Object
     */
    public updateComment(comment: IComment)
    {
        this.commentMgmt.updateCommentAsync(this.currentUser, comment, (newComment: IComment) => {
            if (newComment === ConnectIngComment.GetDefault())
            {
                // failed
                // nop
            }
            else
            {
                // successfull
                this.current = newComment;
            }
        });
    }

    /**
     * Method - Remove Comment
     */
    public removeComment()
    {
        this.commentMgmt.removeCommentAsync(this.currentUser, this.current, (removed: boolean) => {
            if (removed)
            {
                // successfull
                this.parent.loadComments();
            }
            else
            {
                // failed
                // nop
            }
        }
    }


}