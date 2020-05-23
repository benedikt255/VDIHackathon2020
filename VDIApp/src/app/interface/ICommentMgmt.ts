import { IUser } from './IUserMgmt';
import { IPost } from './IPostMgmt';


// Interface - IComment
// It represents an elementary comment under a post
export interface IComment
{
    // Comment Identifier
    readonly id: string;

    // Post Identifier
    readonly postId: string;

    // Author Identifier
    readonly authorId: string;

    // Author Display Name
    readonly author: string;

    // Comment Creation Timestamp
    readonly creationTS: Date;

    // Comment Text
    text: string;
}


// Class - Comment
// represents the elementary comment object
export class ConnectIngComment implements IComment {
  readonly id: string;
  readonly postId: string;
  readonly authorId: string;
  readonly author: string;
  readonly creationTS: Date;
  text: string;

  constructor(id: string,
              postId: string,
              authorId: string,
              author: string,
              ts: Date,
              text: string) {
    this.id = id;
    this.postId = postId;
    this.authorId = authorId;
    this.author = author;
    this.creationTS = ts;
    this.text = text;
  }

  public static GetDefault(): IComment {
    return new ConnectIngComment('', '', '', '', new Date(''), '');
  }
}


// Interface - Comment Management
// represents the ConnectING Facade for Comments, which shall be implemented
// by the backend infrastructure adapter (i.e. Linkando, AWS, Azure, CAS)
export interface ICommentMgmt
{
    // Property - Offline Mode
    // true, if offline mode is active
    offlineMode: boolean;

    // Method - CreateComment
    // creates a new comment under a defined post
    createCommentAsync(user: IUser, parent: IPost, text: string, callback: (comment: IComment) => void): void;

    // Method - UpdateComment
    // updates an existing comment text of an existing comment
    updateCommentAsync(user: IUser, comment: IComment, text: string, callback: (comment: IComment) => void): void;

    // Method - RemoveComment
    // removes an existing comment
    removeCommentAsync(user: IUser, comment: IComment, callback: (removed: boolean) => void): void;

    // Method - GetComments
    // returns the comments under an existing post
    getCommentsAsync(user: IUser, parent: IPost, callback: (comments: Array<IComment>) => void): void;
}

export class MockCommentMgmt implements ICommentMgmt {
  private comment: IComment = {
    id: '1',
    postId: '1',
    authorId: '1',
    author: 'VDI',
    creationTS: new Date('24.05.2020'),
    text: 'Backend Team'
  };
  offlineMode = false;

  createCommentAsync(user: IUser, parent: IPost, text: string, callback: (comment: IComment) => void): void {
    callback(this.comment);
  }

  getCommentsAsync(user: IUser, parent: IPost, callback: (comments: Array<IComment>) => void): void {
    callback([this.comment]);
  }

  removeCommentAsync(user: IUser, comment: IComment, callback: (removed: boolean) => void): void {
    callback(false);
  }

  updateCommentAsync(user: IUser, comment: IComment, text: string, callback: (comment: IComment) => void): void {
    callback(this.comment);
  }
}




