import {ChannelCtrl} from './ChannelCtrl';
import { ConnectIngBaseService, ConnectIngUser, ConnectIngChannel } from '../adapter/base/AbstractBaseService';


/**
 * Controller - ConnectIngCtrl
 * Application Controller to handle the user management
 * and create/remove handling of channels
 */
export class ConnectIngCtrl {

  // Connection State Properties
  public isConnecting = false;
  public isDisconnected = true;
  public isConnected = false;
  public isDisconnecting = false;
  public currentUser: ConnectIngUser;
  public channels: Array<ChannelCtrl>;
  // Management Interfaces
  private readonly baseService: ConnectIngBaseService;

  /**
   * Constructor - ConnectIng Controller
   * @param userMgmt User Management
   * @param chnMgmt Channel Management
   * @param postMgmt Post Management
   * @param commentMgmt Comment Management
   */
  constructor(baseService: ConnectIngBaseService) {
    this.baseService = baseService;
    this.currentUser = ConnectIngUser.GetDefault();
    this.channels = [];

    this.setDisconnected();
  }


  /**
   * Method - ConnectUser
   * @param userName Username of the User
   * @param userPwd Password of the User
   */
  public connectUser(userName: string, userPwd: string, callback: () => void): void {
    this.setConnecting();
    callback();

    this.baseService.connectUserAsync(userName, userPwd, (user: ConnectIngUser) => {
      if (user === ConnectIngUser.GetDefault()) {
        // Connecting failed
        this.setDisconnected();
        this.currentUser = ConnectIngUser.GetDefault();
        callback();
      } else {
        // Connecting successfull
        this.currentUser = user;
        this.setConnected();
        // Auto Load of Channels after successful connecting
        this.loadChannels(callback);
        callback();
      }
    });
  }

  /**
   * Method - DisconnectUser
   */
  public disconnectUser(callback: () => void) {
    this.setDisconnecting();
    callback();

    this.baseService.disconnectUserAsync(this.currentUser, (disconnected: boolean) => {
      if (disconnected) {
        // disconnection successfull
        this.currentUser = ConnectIngUser.GetDefault();
        this.channels = [];
        this.setDisconnected();
        callback();
      } else {
        // disconnection failed
        callback();
      }
    });
  }

  /**
   * Method - LoadChannels
   */
  public loadChannels(callback: () => void): void {
    this.baseService.getChannelsAsync(this.currentUser, (channels: ConnectIngChannel[]) => {
      if (channels === undefined) {
        // Undefined -> error in call
        this.channels = [];
        callback();
      } else {
        this.channels = channels.map((value: ConnectIngChannel, index: number, array: ConnectIngChannel[]) => {
          return new ChannelCtrl(this.baseService, this, value);
        });
        callback();
      }
    });
  }

  /**
   * Method - CreateChannel
   * @param name Name of the new Channel
   * @param desc Description of the new Channel
   */
  public createChannel(name: string, desc: string, callback: () => void) {
    this.baseService.createChannelAsync(this.currentUser, name, desc, (channel: ConnectIngChannel) => {
      if (channel === ConnectIngChannel.GetDefault()) {
        // Create failed
        callback();
      } else {
        // Create successfull
        // Update Channel List
        this.loadChannels(callback);
      }
    });
  }


  /**
   * Method - SetDisconnected State
   */
  private setDisconnected(): void {
    this.isConnected = false;
    this.isConnecting = false;
    this.isDisconnected = true;
    this.isDisconnecting = false;
  }

  /**
   * Method - SetConnecting State
   */
  private setConnecting(): void {
    this.isConnected = false;
    this.isConnecting = true;
    this.isDisconnected = false;
    this.isDisconnecting = false;
  }

  /**
   * Method - SetConnected State
   */
  private setConnected(): void {
    this.isConnected = true;
    this.isConnecting = false;
    this.isDisconnected = false;
    this.isDisconnecting = false;
  }

  /**
   * Method - SetDisconnecting State
   */
  private setDisconnecting(): void {
    this.isConnected = false;
    this.isConnecting = false;
    this.isDisconnected = false;
    this.isDisconnecting = true;
  }


}
