import { IConnectIngPost, mockPostMgmt } from "./IPostMgmt";
import { ConnectingUser} from "./IUserMgmt";

//MockClasses
import {MockUserManagement, ConnectingUser} from "./IUserMgmt";


enum enumConnectIngChannelTypes{
    Broadcast = 0,
    Locals = 1,
    Events = 2,
    Topics = 3,
    Private = 4,
}

export interface IConnectIngChannel{

    readonly id : String;
    name : String;
    description : String;
    picture : String;
    persons  : ConnectingUser[];
    posts : IConnectIngPost[];


}

export interface IConnectIngChannelMgmt{
    createChannel() : IConnectIngChannel
    updateChannel(posts : IConnectIngPost) : IConnectIngChannel
    getChannel(channelId : String) : IConnectIngChannel
    removePost(postId : String) : boolean
}

export class mockConnectingChannelMgmt implements IConnectIngChannelMgmt{
private channel : IConnectIngChannel = {
    id :"1",
    name : "GoldenEye",
    description: "Look your feets!",
    picture: "abc",
    persons : new MockUserManagement().getUser,
    posts : [],
}

    createChannel(): IConnectIngChannel {
       return new Channel("007","GoldenEye","Look your feets!","abc", ["",""], );
    }
    updateChannel(posts: IConnectIngPost): IConnectIngChannel {
        throw new Error("Method not implemented.");
    }
    getChannel(channelId: String): IConnectIngChannel {
        return Channel;
    }
    removePost(postId: String): boolean {
        throw new Error("Method not implemented.");
    }

}
