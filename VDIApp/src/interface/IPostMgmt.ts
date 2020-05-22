

interface IConnectIngPost {
    id: string;
    authorId: string;
    authorIdCreation: string;
    Timestamp: Date;
    title: () => string;
    message: () => string;
    comments: IConnectIngComment;
}