import { IConnectIngComment } from './ICommentMgmt';
import {IConnectIngChannel} from './IChannelMgmt';
import {ConnectingUser} from './IUserMgmt';


// Interface - IConnectIngPost
// It represents an elementary post under a channel
export interface IConnectIngPost {
    // Post Identifier
    id: string;
    // Author Identifier
    authorId: string;
    // Author Display Name
    author: string;
    // Post Creation Timestamp
    creationTS: Date;
    // Post Title
    title: string;
    // Post Text
    message: string;
    // Comments to Psot
    comments: Array<IConnectIngComment>;
}


// Class - ConnectIngComment
// represents the elementary comment object
export class ConnectIngPost implements IConnectIngPost {
    id: string;
    channelId: string;
    authorId: string;
    author: string;
    creationTS: Date;
    title: string;
    message: string;
    comments: Array<IConnectIngComment>;

    constructor(id: string, channelId: string, authorId: string, author: string, ts: Date, title: string, message: string) {
        this.id = id;
        this.channelId = channelId;
        this.authorId = authorId;
        this.author = author;
        this.creationTS = ts;
        this.title = title;
        this.message = message;
        this.comments = [];
    }

}


// Interface - Post Management
// represents the ConnectING Facade for Posts, which shall be implemented
// by the backend infrastructure adapter (i.e. Linkando, AWS, Azure, CAS)
export interface IPostMgmt
{
    // Property - Offline Mode
    // true, if offline mode is active
    offlineMode: boolean;

    // Method - CreateComment
    // creates a new post under a defined channel
    createPost(parent: IConnectIngChannel, title: string, message: string, user: ConnectingUser): IConnectIngPost;

    // Method - UpdateComment
    // updates an existing post title or message of an existing post
    updatePost(comment: IConnectIngPost, text: string, user: ConnectingUser): IConnectIngPost;

    // Method - RemoveComment
    // removes an existing post
    removePost(comment: IConnectIngPost, user: ConnectingUser): boolean;

    // Method - GetPosts
    // returns the posts under an existing channel
    getPosts(parent: IConnectIngChannel, user: ConnectingUser): Array<IConnectIngPost>;
}
