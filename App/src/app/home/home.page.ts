import { Component, OnInit } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import{PushService} from '../push.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  pushes: any = [];

  price:string = '';
  val=true;
  constructor(public fcm: FCM, public plt: Platform,public pushser:PushService, public alet:AlertController) {

    this.plt.ready()
    .then(()=>{
      this.getToken();

      
      this.fcm.onNotification().subscribe(data =>{

        console.log("received notifivcation",data);
    
       
        if(data.wasTapped){
          
          this.price = JSON.stringify(data.price);
          
          console.log("myprice",this.price)


          console.log("Received in background");
        }
        else{
         
          this.price = JSON.stringify(data.price);
          
          console.log("myprice",this.price)
          this.presentAlert()
        
          console.log("Received in foreground");
        }
      });

      this.fcm.onTokenRefresh().subscribe(data =>{

      });

    });
}

callMyNotify(){
  this.pushser.pusyyh().subscribe(res =>{
    console.log(res);
  })
  }

  
    async presentAlert() {
    const alert = await this.alet.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: this.price,
      buttons: ['OK']
    });

    await alert.present();
  }

subscribeToTopic() {
  this.fcm.subscribeToTopic('enappd');
}
getToken() {
  this.fcm.getToken().then(token => {

    console.log(token);
    // Register your new token in your back-end if you want
    // backend.registerToken(token);
  });
}
unsubscribeFromTopic() {
  this.fcm.unsubscribeFromTopic('enappd');
}

}
