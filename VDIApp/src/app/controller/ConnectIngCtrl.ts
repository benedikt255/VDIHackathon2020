import { IUserMgmt, IUser } from 'src/interface/IUserMgmt';
import { IChannelMgmt } from 'src/interface/IChannelMgmt';
import { IChannel } from 'src/interface/IChannelMgmt';




export class ConnectIngCtrl {

private readonly userMgmt: IUserMgmt;
private readonly chnMgmt: IChannelMgmt;
private curUser: IUser;

constructor(userMgmt: IUserMgmt, chnMgmt: IChannelMgmt){
    this.userMgmt = userMgmt;
    this.chnMgmt = chnMgmt;
}


public Channels: Array<IChannel>;


public IsConnecting: boolean;
public IsDisconnected: boolean;
public IsConnected: boolean;
public IsDisconnecting: boolean;


public connectUser(userName: string, userPwd: string){
    this.userMgmt.connectUser(userName, userPwd);
}


}