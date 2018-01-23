import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Socket} from 'ng-socket-io'
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messeges=[];
  nickname='';
  message='';
  user='';
  userList=[];
  socketId='';

  constructor(public navCtrl: NavController,
  private socket:Socket
  ) {  }
  

  sendMessage(){
    this.socket.emit('getMsg',{text:this.message});
    this.message='';
  }
  
  userListAll(){
   this.socket.emit('username',{user:this.user,socketId:'1'});
   this.userList.push({
     user:this.user,
     id:this.socketId
   }) 
  
  }

  getMessages(){
    let observable=new Observable(observer=>{
      this.socket.on('message',(data)=>{
        observer.next(data);
      
      });
    });
    return observable;
  }

}
