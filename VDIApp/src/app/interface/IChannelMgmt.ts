import { IPost, MockPostMgmt } from './IPostMgmt';
import { IUser } from './IUserMgmt';

//MockClasses
import { MockUserMgmt } from './IUserMgmt';
import { MockPostMgmt } from './IPostMgmt';


enum enumConnectIngChannelTypes{
    Broadcast = 0,
    Locals = 1,
    Events = 2,
    Topics = 3,
    Private = 4,
}

export interface IChannel{
    readonly id: string;
    name: string;
    description: string;
    picture: string;
    persons: IUser[];
    posts: IPost[];
}

export interface IChannelMgmt{
    createChannel(): IChannel;
    updateChannel(posts: IPost): IChannel;
    getChannel(channelId: string): IChannel;
    removeChannel(channelId: string): boolean;
}

export class MockConnectingChannelMgmt implements IChannelMgmt{
    private channel: IChannel = {
        id : '1',
        name : 'GoldenEye',
        description: 'Look your feets!',
        picture: 'abc',
        persons : new MockUserMgmt().getUser(),
        posts : [],
    };

    createChannel(): IChannel {
       return this.channel;
    }
    updateChannel(posts: IPost): IChannel {
        throw new Error('Method not implemented.');
    }
    getChannel(channelId: string): IChannel {
        return this.channel;
    }
    removeChannel(postId: string): boolean {
        throw new Error('Method not implemented.');
    }

}
