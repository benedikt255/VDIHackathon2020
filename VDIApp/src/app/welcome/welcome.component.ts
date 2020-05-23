import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectIngChannel, ConnectIngBaseService, ConnectIngUser } from '../adapter/base/AbstractBaseService';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['../app.component.css']
})
export class WelcomeComponent implements OnInit {

  private baseService: ConnectIngBaseService;
  private router: Router;

    // Connection State Properties
    public currentUser: ConnectIngUser;
    public channels: ConnectIngChannel[];



  constructor(baseService: ConnectIngBaseService, router: Router) {
    this.router = router;
    this.baseService = baseService;
    this.currentUser = this.baseService.currentUser;
    this.channels = [];
    this.loadChannels();
   }

  ngOnInit(): void {
  }


  public GoTo(channel: string): void
  {
      if(channel === undefined) { return; }
      this.baseService.currentChannel = this.channels.filter(value => value.id === channel)[0];
      this.router.navigate(['/channel']);
  }


  /**
   * Method - LoadChannels
   */
  public loadChannels(): void {
    this.baseService.getChannelsAsync(this.currentUser, (channels: ConnectIngChannel[]) => {
      if (channels === undefined) {
        // Undefined -> error in call
        this.channels = [];
      } else {
        this.channels = channels;
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
        this.loadChannels();
      }
    });
  }

}
