import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  ConnectIngBaseService,
  ConnectIngChannel,
  ConnectIngComment,
  ConnectIngPost,
  ConnectIngUser
} from '../service/adapter/base/AbstractBaseService';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {CreatePostComponent} from './create-post.component';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['../app.component.css']
})
export class ChannelComponent implements OnInit {

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};
  public currentUser: ConnectIngUser;
  public current: ConnectIngChannel;
  public posts: ConnectIngPost[];
  private baseService: ConnectIngBaseService;
  private router: Router;

  constructor(baseService: ConnectIngBaseService, router: Router, private bottomSheet: MatBottomSheet) {
    this.baseService = baseService;
    this.router = router;
    this.currentUser = this.baseService.currentUser;
    this.current = this.baseService.currentChannel;
    this.posts = [];
    this.bottomSheet = bottomSheet;

    this.loadPosts();
  }

  ngOnInit(): void {

  }

  public openPostPanel(): void {
    this.bottomSheet.open(CreatePostComponent).afterDismissed().subscribe(() =>{this.loadPosts(); });
  }

  public loadPost(post: string): void {
    if (post === undefined) {
      return;
    }
    this.baseService.currentPost = this.posts.filter(value => value.id === post)[0];
    this.router.navigate(['/post']);
  }


  /**
   * Method - UpdateChannel
   * change the title and message of a channel object
   * @param channel Channel Object
   */
  public updateChannel() {
    if (this.current === ConnectIngChannel.GetDefault()) {
      return;
    }

    this.baseService.updateChannelAsync(this.currentUser, this.current, (newChannel: ConnectIngChannel) => {
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
    if (this.current === ConnectIngChannel.GetDefault()) {
      return;
    }

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
    if (this.current === ConnectIngChannel.GetDefault()) {
      return;
    }

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
    if (this.current === ConnectIngChannel.GetDefault()) {
      return;
    }

    this.baseService.createPostAsync(this.currentUser, this.current, title, message, (post: ConnectIngPost) => {
      if (post === ConnectIngPost.GetDefault()) {
        // failed
        // nop
      } else {
        // successfull
      }
    });
  }


  /**
   * Method to GoBack to Channel View
   */
  public GoBack(): void {
    this.baseService.currentComment = ConnectIngComment.GetDefault();
    this.baseService.currentPost = ConnectIngPost.GetDefault();
    this.baseService.currentChannel = ConnectIngChannel.GetDefault();
    this.router.navigate(['/welcome']);
  }


  /**
   * Method to recognize swipe features
   * @param action
   */
  public swipe(action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.GoBack();
    }

    // swipe left, previous avatar
    if (action === this.SWIPE_ACTION.LEFT) {

    }

  }


}




