import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Socket} from 'ng-socket-io'
import {Observable} from 'rxjs/Observable'
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messeges=[];
  nickname='';
  message='';
  user='';
  userList=Array<{userName:string,id:string}>();
  socketId='';
  selectedUser={user:{},id:''};

  constructor(public navCtrl: NavController,
  private socket:Socket
  ) {


    this.userListAll().subscribe(data=>{
      let js  = JSON.stringify(data);
      let jsparse = JSON.parse(js);
      console.log(data);
      for(var i =0;i<jsparse.length;i++)
      {
        let user_name = JSON.stringify(data[i].userName.user);
        this.userList.push({ userName:user_name,id:data[i].id});
      } 
   });   
  }
    
  

  sendMessage(){
    if(this.message!=null){
      this.socket.emit('getMsg',{
        toid:this.selectedUser.id,
        msg:this.message,
        name:this.user
      });
    }
    // this.socket.emit('getMsg',{text:this.message});
    // this.message='';
  }
  selectUser(data){
    this.selectedUser=data;
    console.log(data);
  }
  
  userListAll(){
    console.log(this.user);
   this.socket.connect();
   this.socket.emit('username',{user:this.user});
  let observable = new Observable(observer=> { this.socket.on('userList',(data)=>{
  observer.next(data);
   });
  });
  return observable;
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
