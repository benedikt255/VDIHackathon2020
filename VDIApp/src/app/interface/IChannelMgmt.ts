import { IPost } from './IPostMgmt';
import { IUser } from './IUserMgmt';

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
}

export interface IChannelMgmt{
    createChannel(): IChannel;
    updateChannel(posts: IPost): IChannel;
    getChannel(channelId: string): IChannel;
    removeChannel(channelId: string): IChannel;
}

export class MockConnectingChannelMgmt implements IChannelMgmt{
    private user: IUser = {
        id: '1',
        firstName: 'Mustermann',
        lastName: 'Max',
        location: 'Berlin',
        image: '',
        jobTitle: 'Ingenieur',
        email: 'Max.Mustermann@example.com',
        username: 'user1',
        token: 'Basic 12345'
      };
    private channel: IChannel = {
        id : '1',
        name : 'GoldenEye',
        description: 'Look your feets!',
        picture: 'abc',
        persons : [this.user],
    };

    createChannel(): IChannel {
       return this.channel;
    }
    updateChannel(posts: IPost): IChannel {
        return this.channel;
    }
    getChannel(channelId: string): IChannel {
        return this.channel;
    }
    removeChannel(postId: string): IChannel {
        return this.channel;
    }

}
