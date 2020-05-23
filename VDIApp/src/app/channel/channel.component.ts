import {Component, OnInit} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ConnectIngBaseService, ConnectIngUser, ConnectIngChannel, ConnectIngPost } from '../adapter/base/AbstractBaseService';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['../app.component.css']
})
export class ChannelComponent implements OnInit{

  private baseService: ConnectIngBaseService;
  private router: Router;

  public currentUser: ConnectIngUser;
  public current: ConnectIngChannel;
  public posts: ConnectIngPost[];


  constructor(baseService: ConnectIngBaseService, router: Router) {
    this.baseService = baseService;
    this.router = router;
    this.currentUser = this.baseService.currentUser;
    this.current =  this.baseService.currentChannel;
    this.posts = [];

    this.loadPosts();
  }

  ngOnInit(): void {

  }


  public GoTo(post: string): void
  {
      if(post === undefined) { return; }
      this.baseService.currentPost = this.posts.filter(value => value.id === post)[0];
      this.router.navigate(['/post']);
  }


  /**
   * Method - UpdateChannel
   * change the title and message of a channel object
   * @param channel Channel Object
   */
  public updateChannel() {
    if (this.current === ConnectIngChannel.GetDefault()){ return; }

    this.baseService.updateChannelAsync(this.currentUser, this.current , (newChannel: ConnectIngChannel) => {
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
    if (this.current === ConnectIngChannel.GetDefault()){ return; }

    this.baseService.removeChannelAsync(this.currentUser, this.current, (removed: boolean) => {
      if (removed) {
        // remove successful
        // update channel List
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
    if (this.current === ConnectIngChannel.GetDefault()){ return; }

    this.baseService.getPostsAsync(this.currentUser, this.current, (posts: ConnectIngPost[]) => {
      if (posts === undefined) {
        // failed
        // nop
      } else {
        // successfull
        this.posts = posts;
      }
    });
  }

  /**
   * Method - Create a new Post
   * @param title Title of a Post
   * @param message Message of a Post
   */
  public createPost(title: string, message: string) {
    if (this.current === ConnectIngChannel.GetDefault()){ return; }

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


