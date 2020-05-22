import { IChannel } from './IChannelMgmt';
import { IUser } from './IUserMgmt';


// Interface - IPost
// It represents an elementary post under a channel
export interface IPost {
    // Post Identifier
    id: string;
    // Channel Identifier
    channelId: string;
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
}


// Class - ConnectIngPost
// represents the elementary comment object
export class ConnectIngPost implements IPost {
    id: string;
    channelId: string;
    authorId: string;
    author: string;
    creationTS: Date;
    title: string;
    message: string;

    constructor(id: string, channelId: string, authorId: string, author: string, ts: Date, title: string, message: string) {
        this.id = id;
        this.channelId = channelId;
        this.authorId = authorId;
        this.author = author;
        this.creationTS = ts;
        this.title = title;
        this.message = message;
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

export class MockPostMgmt implements IPostMgmt {
  private post: IPost = {
    id: '1',
    channelId: '1',
    authorId: '1',
    author: 'VDI',
    creationTS: new Date('24.05.2020'),
    title: 'Test',
    message: 'Dies ist ein Test.',
  };
  offlineMode = false;

  createPost(user: IUser, parent: IChannel, title: string, message: string): IPost {
    return this.post;
  }

  getPosts(user: IUser, parent: IChannel): Array<IPost> {
    return [this.post];
  }

  removePost(user: IUser, comment: IPost): boolean {
    return false;
  }

  updatePost(user: IUser, comment: IPost, text: string): IPost {
    this.post.author += ' - SUJ';
    return this.post;
  }
}
