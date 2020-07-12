import { Component, OnInit } from '@angular/core';
import { Socketcomm } from '../services/socketcomm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   selectedRoom :string;
   user :string;
   msgList : any[]=[];
   msg : string;
  constructor(private socketCommService : Socketcomm){

  }
  ngOnInit(){
    this.socketCommService.serverNewMessage().subscribe(
      (res)=>{
        console.log('ths server is ',res)
        this.msgList.push(res)
      },
      (err)=>{
        console.log(err)
      }
  )
    this.socketCommService.serverJoinRoom().subscribe(
        (res)=>{
          console.log('ths server is ',res)
          this.msgList.push(res)
        },
        (err)=>{
          console.log(err)
        }
    )
  }
  selectRoom(){
    console.log('Selected room is '+this.selectedRoom)
    this.socketCommService.joinRoom(this.user,this.selectedRoom)
  }
sendMessage(){
  this.socketCommService.sendMessageClient(this.user,this.msg,this.selectedRoom)
}

}
