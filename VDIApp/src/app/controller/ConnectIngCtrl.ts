import { IUserMgmt, IUser, ConnectIngUser } from '../interface/IUserMgmt';
import { IChannelMgmt, IChannel, ConnectIngChannel } from '../interface/IChannelMgmt';
import { ChannelCtrl } from './ChannelCtrl';
import { IPostMgmt } from '../interface/IPostMgmt';
import { ICommentMgmt } from '../interface/ICommentMgmt';




/**
 * Controller - ConnectIngCtrl
 * Application Controller to handle the user management
 * and create/remove handling of channels
 */
export class ConnectIngCtrl {

    // Management Interfaces
    private readonly userMgmt: IUserMgmt;
    private readonly chnMgmt: IChannelMgmt;
    private readonly postMgmt: IPostMgmt;
    private readonly commentMgmt: ICommentMgmt;

    // Connection State Properties
    public isConnecting = false;
    public isDisconnected = true;
    public isConnected = false;
    public isDisconnecting = false;

    public currentUser: IUser;
    public channels: Array<ChannelCtrl>;


    /**
     * Constructor - ConnectIng Controller
     * @param userMgmt User Management
     * @param chnMgmt Channel Management
     * @param postMgmt Post Management
     * @param commentMgmt Comment Management
     */
constructor(userMgmt: IUserMgmt, chnMgmt: IChannelMgmt, postMgmt: IPostMgmt, commentMgmt: ICommentMgmt){
    this.userMgmt = userMgmt;
    this.chnMgmt = chnMgmt;
    this.postMgmt = postMgmt;
    this.commentMgmt = commentMgmt;

    this.currentUser = ConnectIngUser.GetDefault();
    this.channels = [];

    this.setDisconnected();
}





/**
 * Method - ConnectUser
 * @param userName Username of the User
 * @param userPwd Password of the User
 */
public connectUser(userName: string, userPwd: string): void{

    this.userMgmt.connectUserAsync(userName, userPwd, (user: IUser) => {
        if (user === ConnectIngUser.GetDefault())
        {
            // Connecting failed
            this.setDisconnected();
            this.currentUser = ConnectIngUser.GetDefault();
        }
        else
        {
            // Connecting successfull
            this.currentUser = user;
            this.setConnected();
            // Auto Load of Channels after successful connecting
            this.loadChannels();
        }
    });
}

/**
 * Method - DisconnectUser
 */
public disconnectUser()
{
    this.userMgmt.disconnectUserAsync(this.currentUser, (disconnected: boolean) =>{
        if (disconnected)
        {
            // disconnection successfull
            this.currentUser = ConnectIngUser.GetDefault();
            this.channels = [];
            this.setDisconnected();
        }
        else
        {
            // disconnection failed
            // nop
        }
    });
}

/**
 * Method - LoadChannels
 */
public loadChannels(): void{
    this.chnMgmt.getChannelsAsync(this.currentUser, (channels: IChannel[]) => {
        if (channels === undefined)
        {
            // Undefined -> error in call
            this.channels = [];
        }
        else
        {
            this.channels = channels.map((value: IChannel, index: number, array: IChannel[]) => {
                return new ChannelCtrl(this.chnMgmt, this.postMgmt, this.commentMgmt, this, value);
            });
        }
    });
}

/**
 * Method - CreateChannel
 * @param name Name of the new Channel
 * @param desc Description of the new Channel
 */
public createChannel(name: string, desc: string)
{
    this.chnMgmt.createChannelAsync(this.currentUser, name, desc, (channel: IChannel) => {
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


/**
 * Method - SetDisconnected State
 */
private setDisconnected(): void{
    this.isConnected = false;
    this.isConnecting = false;
    this.isDisconnected = true;
    this.isDisconnecting = false;
}

/**
 * Method - SetConnecting State
 */
private setConnecting(): void{
    this.isConnected = false;
    this.isConnecting = true;
    this.isDisconnected = false;
    this.isDisconnecting = false;
}

/**
 * Method - SetConnected State
 */
private setConnected(): void{
    this.isConnected = true;
    this.isConnecting = false;
    this.isDisconnected = false;
    this.isDisconnecting = false;
}

/**
 * Method - SetDisconnecting State
 */
private setDisconnecting(): void{
    this.isConnected = false;
    this.isConnecting = false;
    this.isDisconnected = false;
    this.isDisconnecting = true;
}


}
