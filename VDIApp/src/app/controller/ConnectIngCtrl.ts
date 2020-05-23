import { IUserMgmt, IUser, ConnectIngUser } from '../interface/IUserMgmt';
import { IChannelMgmt, IChannel, ConnectIngChannel } from '../interface/IChannelMgmt';





export class ConnectIngCtrl {

    // Management Interfaces
    private readonly userMgmt: IUserMgmt;
    private readonly chnMgmt: IChannelMgmt;

// Connection State Properties
public IsConnecting = false;
public IsDisconnected = true;
public IsConnected = false;
public IsDisconnecting = false;

public curUser: IUser;
public Channels: Array<IChannel>;

constructor(userMgmt: IUserMgmt, chnMgmt: IChannelMgmt){
    this.userMgmt = userMgmt;
    this.chnMgmt = chnMgmt;
    this.curUser = ConnectIngUser.GetDefault();
    this.Channels = [];

    this.setDisconnected();
}






public connectUser(userName: string, userPwd: string): void{

    this.userMgmt.connectUserAsync(userName, userPwd, (user: IUser) => {
        if (user === ConnectIngUser.GetDefault())
        {
            // Connecting failed
            this.setDisconnected();
            this.curUser = ConnectIngUser.GetDefault();
        }
        else
        {
            // Connecting successfull
            this.curUser = user;
            this.setConnected();
            // Auto Load of Channels after successful connecting
            this.updateChannels();
        }
    });
}

public disconnectUser()
{
    this.userMgmt.disconnectUserAsync(this.curUser, (disconnected: boolean) =>{
        if (disconnected)
        {
            // disconnection successfull
            this.curUser = ConnectIngUser.GetDefault();
            this.Channels = [];
            this.setDisconnected();
        }
        else
        {
            // disconnection failed
            // nop
        }
    });
}

public updateChannels(): void{
    this.chnMgmt.getChannelsAsync(this.curUser, (channels: IChannel[]) => {
        if (channels === undefined)
        {
            // Undefined -> error in call
            this.Channels = [];
        }
        else
        {
            this.Channels = channels;
        }
    });
}

public createChannel(name: string, desc: string)
{
    this.chnMgmt.createChannelAsync(this.curUser, name, desc, (channel: IChannel) => {
        if (channel === ConnectIngChannel.GetDefault())
        {
            // Create failed
            // nop
        }
        else
        {
            // Create successfull
            // Update Channel List
            this.updateChannels();
        }
    });
}

public removeChannel(channel: IChannel)
{
    this.chnMgmt.removeChannelAsync(this.curUser, channel, (removed: boolean) => {
        if (removed)
        {
            // remove successful
            // update channel List
            this.updateChannels();
        }
        else
        {
            // remove failed
            // nop
        }
    });
}











private setDisconnected(): void{
    this.IsConnected = false;
    this.IsConnecting = false;
    this.IsDisconnected = true;
    this.IsDisconnecting = false;
}

private setConnecting(): void{
    this.IsConnected = false;
    this.IsConnecting = true;
    this.IsDisconnected = false;
    this.IsDisconnecting = false;
}

private setConnected(): void{
    this.IsConnected = true;
    this.IsConnecting = false;
    this.IsDisconnected = false;
    this.IsDisconnecting = false;
}

private setDisconnecting(): void{
    this.IsConnected = false;
    this.IsConnecting = false;
    this.IsDisconnected = false;
    this.IsDisconnecting = true;
}


}