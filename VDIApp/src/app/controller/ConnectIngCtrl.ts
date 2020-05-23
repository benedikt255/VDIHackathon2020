import { IUserMgmt, IUser, ConnectIngUser } from '../interface/IUserMgmt';
import { IChannelMgmt, IChannel, ConnectIngChannel } from '../interface/IChannelMgmt';
import { ChannelCtrl } from './ChannelCtrl';
import { IPostMgmt } from '../interface/IPostMgmt';
import { ICommentMgmt } from '../interface/ICommentMgmt';





export class ConnectIngCtrl {

    // Management Interfaces
    private readonly userMgmt: IUserMgmt;
    private readonly chnMgmt: IChannelMgmt;
    private readonly postMgmt: IPostMgmt;
    private readonly commentMgmt: ICommentMgmt;

    // Connection State Properties
    public IsConnecting = false;
    public IsDisconnected = true;
    public IsConnected = false;
    public IsDisconnecting = false;

    public CurrentUser: IUser;
    public Channels: Array<ChannelCtrl>;

constructor(userMgmt: IUserMgmt, chnMgmt: IChannelMgmt, postMgmt: IPostMgmt, commentMgmt: ICommentMgmt){
    this.userMgmt = userMgmt;
    this.chnMgmt = chnMgmt;
    this.postMgmt = postMgmt;
    this.commentMgmt = commentMgmt;

    this.CurrentUser = ConnectIngUser.GetDefault();
    this.Channels = [];

    this.setDisconnected();
}






public connectUser(userName: string, userPwd: string): void{

    this.userMgmt.connectUserAsync(userName, userPwd, (user: IUser) => {
        if (user === ConnectIngUser.GetDefault())
        {
            // Connecting failed
            this.setDisconnected();
            this.CurrentUser = ConnectIngUser.GetDefault();
        }
        else
        {
            // Connecting successfull
            this.CurrentUser = user;
            this.setConnected();
            // Auto Load of Channels after successful connecting
            this.loadChannels();
        }
    });
}

public disconnectUser()
{
    this.userMgmt.disconnectUserAsync(this.CurrentUser, (disconnected: boolean) =>{
        if (disconnected)
        {
            // disconnection successfull
            this.CurrentUser = ConnectIngUser.GetDefault();
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

public loadChannels(): void{
    this.chnMgmt.getChannelsAsync(this.CurrentUser, (channels: IChannel[]) => {
        if (channels === undefined)
        {
            // Undefined -> error in call
            this.Channels = [];
        }
        else
        {
            this.Channels = channels.map((value: IChannel, index: number, array: IChannel[]) => {
                return new ChannelCtrl(this.chnMgmt, this.postMgmt, this.commentMgmt, this.CurrentUser, value);
            });
        }
    });
}

public createChannel(name: string, desc: string)
{
    this.chnMgmt.createChannelAsync(this.CurrentUser, name, desc, (channel: IChannel) => {
        if (channel === ConnectIngChannel.GetDefault())
        {
            // Create failed
            // nop
        }
        else
        {
            // Create successfull
            // Update Channel List
            this.loadChannels();
        }
    });
}

public removeChannel(channel: IChannel)
{
    this.chnMgmt.removeChannelAsync(this.CurrentUser, channel, (removed: boolean) => {
        if (removed)
        {
            // remove successful
            // update channel List
            this.loadChannels();
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