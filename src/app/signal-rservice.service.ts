import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {

  private hubConnection!: signalR.HubConnection;

  constructor() { }
  public startConnection = () => {
    return new Promise((resolve: any, reject: any) => {
      try{

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7165/Notify', {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .build();
      this.hubConnection
        .start()
        .then(() => {console.log('Connection started');resolve(true);})
        .catch(err => {console.log('Error while starting connection: ' + err);resolve(false);})
      }catch(error:any) {
        console.log(error.message);
        resolve(false);
      }
    })
  }

  public addListner = () => {
    this.hubConnection.on('SendMessage', (notification: Notification) => {
      this.showNotification(notification);
    });
  }

  public subscribeToUser(userId: string) {
    this.hubConnection.invoke("SubscribeToUser", userId)
  }

  showNotification(notification: Notification) {
    console.log(notification)
   // alert(notification);
  }
}
