import { IComment } from './ICommentMgmt';
import { IChannel } from './IChannelMgmt';
import { IUser, IUserMgmt } from './IUserMgmt';


// Interface - IConnectIngPost
// It represents an elementary post under a channel
export interface IPost {
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
    comments: Array<IComment>;
}


// Class - ConnectIngComment
// represents the elementary comment object
export class ConnectIngPost implements IPost {
    id: string;
    channelId: string;
    authorId: string;
    author: string;
    creationTS: Date;
    title: string;
    message: string;
    comments: Array<IComment>;

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
    createPost(user: IUser, parent: IChannel, title: string, message: string): IPost;

    // Method - UpdateComment
    // updates an existing post title or message of an existing post
    updatePost(user: IUser, comment: IPost, text: string): IPost;

    // Method - RemoveComment
    // removes an existing post
    removePost(user: IUser, comment: IPost): boolean;

    // Method - GetPosts
    // returns the posts under an existing channel
    getPosts(user: IUser, parent: IChannel): Array<IPost>;
}
