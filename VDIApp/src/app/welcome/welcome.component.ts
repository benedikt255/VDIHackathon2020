import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectIngCtrl } from '../controller/ConnectIngCtrl';
import { Router } from '@angular/router';
import { ChannelCtrl } from '../controller/ChannelCtrl';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['../app.component.css'],
  providers: [ConnectIngCtrl]
})
export class WelcomeComponent implements OnInit {

  private coreCtrl: ConnectIngCtrl;
  private router: Router;

  public Channels: ChannelCtrl[];


  constructor(coreCtrl: ConnectIngCtrl, router: Router) {
    this.router = router;
    this.coreCtrl = coreCtrl;
    this.Channels = [];

    this.coreCtrl.loadChannels(() => {
      this.Channels = this.coreCtrl.channels;
    })
   }

  ngOnInit(): void {
  }



  public Refresh(): void {
    this.coreCtrl.loadChannels(() => this.Channels = this.coreCtrl.channels);
  }

}
