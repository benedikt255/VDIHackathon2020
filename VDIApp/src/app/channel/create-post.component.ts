import {Component} from '@angular/core';
import {ConnectIngBaseService} from '../adapter/base/AbstractBaseService';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['../app.component.css'],
})
export class CreatePostComponent {
  public postText: string;
  private baseService: ConnectIngBaseService;

  constructor(baseService: ConnectIngBaseService, private bottomSheetRef: MatBottomSheetRef<CreatePostComponent>) {
    this.baseService = baseService;
    this.postText = 'Please write in your post!';
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }


}
