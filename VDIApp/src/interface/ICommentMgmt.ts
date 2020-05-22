import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

//Enumeration - enumConnectIngCommentTypes
//List of different comment types
enum enumConnectIngCommentTypes
{
    //Normal Post
    Post = 0,

    //Request for Order or Offer
    Request = 1,

    //Answer for a Question
    Answer = 2,

    //Vote for a Poll
    Vote = 3
}


//Interface - IConnectIngComment
//It represents a comment under a post
interface IConnectIngComment
{
    //Comment Identifier
    id : string;

    //Comment Type
    type: enumConnectIngCommentTypes;
    
    //Post Identifier
    postId: string;

    //Author Identifier
    authorId: string;

    //Author Display Name
    author: string;

    //Comment Creation Timestamp
    creationTS: Date;

    //Comment Text
    text: string;
}


