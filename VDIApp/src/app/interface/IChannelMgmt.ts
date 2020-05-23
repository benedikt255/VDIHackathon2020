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
    createChannelAsync(callback: (channel: IChannel) => void): void;
    updateChannelAsync(posts: IPost, callback: (channel: IChannel) => void): void;
    getChannelAsync(channelId: string, callback: (channel: IChannel) => void): void;
    removeChannelAsync(channelId: string, callback: (channel: IChannel) => void): void;
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

    createChannelAsync(callback: (channel: IChannel) => void): void {
        callback(this.channel);
    }
    updateChannelAsync(posts: IPost, callback: (channel: IChannel) => void): void {
        callback(this.channel);
    }
    getChannelAsync(channelId: string, callback: (channel: IChannel) => void): void{
        callback(this.channel);
    }
    removeChannelAsync(postId: string, callback: (channel: IChannel) => void): void {
        callback(this.channel);
    }

}
