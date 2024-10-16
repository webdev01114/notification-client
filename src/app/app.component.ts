import { Component } from '@angular/core';
import {SignalRServiceService} from './signal-rservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notification-client';
  constructor(private signalRService: SignalRServiceService) {
    // Set default language
   // translate.setDefaultLang('en');
    
    
  }

  ngOnInit(): void {
    this.signalRService.startConnection().then((rsp:any) => {
      if(rsp) {
        this.signalRService.addListner();
        this.signalRService.subscribeToUser("1");
      }
    })
   
  }
}
