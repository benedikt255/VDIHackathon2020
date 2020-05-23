import {PostCtrl} from './PostCtrl';
import {ConnectIngCtrl} from './ConnectIngCtrl';
import { ConnectIngBaseService, ConnectIngUser, ConnectIngChannel, ConnectIngPost } from '../adapter/base/AbstractBaseService';
import { Injectable } from '@angular/core';


/**
 * Controller - ChannelCtrl
 * Application Controller to handle a channel
 * and create/remove handling of posts
 */
@Injectable({
  providedIn: 'root'
})
export class ChannelCtrl {

  public currentUser: ConnectIngUser;
  public current: ConnectIngChannel;
  public posts: Array<PostCtrl>;
  // Management Interfaces
  private readonly baseService: ConnectIngBaseService;
  private readonly parent: ConnectIngCtrl;

  /**
   * Constructor - Channel Controller
   * @param chnMgmt Channel Management
   * @param postMgmt Post Management
   * @param commentMgmt Comment Management
   * @param parent ConnectIng Controller
   * @param channel Current Channel
   */
  constructor(
    baseService: ConnectIngBaseService,
    parent: ConnectIngCtrl,
    channel: ConnectIngChannel
  ) {
    this.baseService = baseService;

    this.parent = parent;

    this.currentUser = this.parent.currentUser;
    this.current = channel;
    this.posts = [];

    this.loadPosts();
  }


  /**
   * Method - UpdateChannel
   * change the title and message of a channel object
   * @param channel Channel Object
   */
  public updateChannel(channel: ConnectIngChannel) {
    this.baseService.updateChannelAsync(this.currentUser, channel, (newChannel: ConnectIngChannel) => {
      if (newChannel === ConnectIngChannel.GetDefault()) {
        // failed
        // nop
      } else {
        this.current = newChannel;
        this.loadPosts();
      }
    });
  }

  /**
   * Method - RemoveChannel
   * removes the current channel object
   * @param channel Channel Object
   */
  public removeChannel() {
    this.baseService.removeChannelAsync(this.currentUser, this.current, (removed: boolean) => {
      if (removed) {
        // remove successful
        // update channel List
        this.parent.loadChannels(() => {});
      } else {
        // remove failed
        // nop
      }
    });
  }

  /**
   * Method - Load the List of the Posts
   */
  public loadPosts(): void {
    this.baseService.getPostsAsync(this.currentUser, this.current, (posts: ConnectIngPost[]) => {
      if (posts === undefined) {
        // failed
        // nop
      } else {
        // successfull
        this.posts = posts.map((value: ConnectIngPost, index: number, array: ConnectIngPost[]) => {
          return new PostCtrl(this.baseService, value, this);
        });
      }
    });
  }

  /**
   * Method - Create a new Post
   * @param title Title of a Post
   * @param message Message of a Post
   */
  public createPost(title: string, message: string) {
    this.baseService.createPostAsync(this.currentUser, this.current, title, message, (post: ConnectIngPost) => {
      if (post === ConnectIngPost.GetDefault()) {
        // failed
        // nop
      } else {
        // successful
        this.loadPosts();
      }
    });
  }
}
