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

export class ConnectIngChannel implements IChannel{
    readonly id: string;
    name: string;
    description: string;
    picture: string;
    persons: IUser[];

    constructor(id: string, name: string, description: string, picture: string, persons: IUser[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.picture = picture;
        this.persons = persons;
    }

    public static GetDefault(): IChannel {
      return new ConnectIngChannel('', '', '', '', []);
    }
}


export interface IChannelMgmt{
    createChannelAsync(callback: (channel: IChannel) => void): void;
    updateChannelAsync(posts: IPost, callback: (channel: IChannel) => void): void;
    getChannelAsync(channelId: string, callback: (channel: IChannel) => void): void;
    removeChannelAsync(channelId: string, callback: (channel: IChannel) => void): void;
    getChannelsAsync(user: IUser, callback: (channels: IChannel[]) => void): void;
}

export class MockChannelMgmt implements IChannelMgmt{
    private channel: IChannel = {
        id : '1',
        name : 'GoldenEye',
        description: 'Look your feets!',
        picture: 'abc',
        persons : [],
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
    getChannelsAsync(user: IUser, callback: (channels: IChannel[]) => void){
        callback([this.channel]);
    }

}
