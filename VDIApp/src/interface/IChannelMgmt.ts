import { IConnectIngPost } from "./IPostMgmt";


enum enumConnectIngChannelTypes{
    Broadcast = 0,
    Locals = 1,
    Events = 2,
    Topics = 3,
    Private = 4,
}

export interface IConnectIngChannel{

    id : String
    name : String
    description : String
    picture : String
    persons  : String[]
    posts : IConnectIngPost[]

    createChannel() : boolean
    updateChannel() : boolean
    getChannel(channelId : String) : IConnectIngChannel
    removePost(postId : String) : boolean
}

export class mockChannel implements IConnectIngChannel{
    id: String;
    name: String;
    description: String;
    picture: String;
    persons: String[];
    posts: any[];

    createChannel(): boolean {
        return false;
    }

    private constructor(){
        this.id = "007"
        this.name = "GoldenEye"
        this.description = "you know this!"
        this.picture = ""
        this.persons = ["Bond, James"]
        this.posts = [mockPost] //TODO mockPostClass?!?
    }

    updateChannel(): boolean {
        this.description = "updated"
        return true;
    }

    getChannel(channelId : String): IConnectIngChannel {
        return this
    }

    removePost(postId: String): boolean {
        throw new Error("Method not implemented.");
    }

}
