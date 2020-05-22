import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IConnectIngPost } from './IPostMgmt';
import {ConnectingUser} from './IUserMgmt';


// Interface - IConnectIngComment
// It represents an elementary comment under a post
export interface IConnectIngComment
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
    readonly text: string;
}


// Class - ConnectIngComment
// represents the elementary comment object
export class ConnectIngComment implements IConnectIngComment {
    id: string;
    postId: string;
    authorId: string;
    author: string;
    creationTS: Date;
    text: string;

    constructor(id: string, postId: string, authorId: string, author: string, ts: Date, text: string ){
        this.id = id;
        this.postId = postId;
        this.authorId = authorId;
        this.author = author;
        this.creationTS = ts;
        this.text = text;
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
    createComment(parent: IConnectIngPost, text: string, user: ConnectingUser): IConnectIngComment;

    // Method - UpdateComment
    // updates an existing comment text of an existing comment
    updateComment(comment: IConnectIngComment, text: string, user: ConnectingUser): IConnectIngPost;

    // Method - RemoveComment
    // removes an existing comment
    removeComment(comment: IConnectIngComment, user: ConnectingUser): boolean;

    // Method - GetComments
    // returns the comments under an existing post
    getComments(parent: IConnectIngPost, user: ConnectingUser): Array<IConnectIngComment>;
}




