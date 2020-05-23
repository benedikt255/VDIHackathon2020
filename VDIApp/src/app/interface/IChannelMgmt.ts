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

    public static GetDefault(): ConnectIngChannel{
        return new ConnectIngChannel('', '', '', '', []);
      }
}


export interface IChannelMgmt{
    createChannelAsync(user: IUser, name: string, description: string, callback: (channel: IChannel) => void): void;
    updateChannelAsync(user: IUser, channel: IChannel, callback: (channel: IChannel) => void): void;
    removeChannelAsync(user: IUser, channelId: string, callback: (removed: boolean) => void): void;
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

    createChannelAsync(user: IUser, name: string, description: string, callback: (channel: IChannel) => void): void {
        callback(this.channel);
    }
    updateChannelAsync(user: IUser, channel: IChannel, callback: (channel: IChannel) => void): void {
        callback(this.channel);
    }
    removeChannelAsync(user: IUser, channelId: string, callback: (removed: boolean) => void): void {
        callback(true);
    }
    getChannelsAsync(user: IUser, callback: (channels: IChannel[]) => void){
        callback([this.channel]);
    }

}
