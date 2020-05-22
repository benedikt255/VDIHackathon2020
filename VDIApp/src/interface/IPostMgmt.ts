import { IConnectIngComment } from './ICommentMgmt';

// Interface - IConnectIngPost
// It represents a post under a person
interface IConnectIngPost {
    // Post Identifier
    id: string;
    // Author Identifier
    authorId: string;
    // Author Identifier
    authorIdCreation: string;
    // post Creation Timestamp
    creationTS: Date;
    // Post Title
    title: string;
    // Post Text
    message: string;
    // Comments to Psot
    comments: Array<IConnectIngComment>;
}
