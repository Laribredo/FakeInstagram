import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit(){
    
    var firebaseConfig = {
      apiKey: "AIzaSyBkYtIT1_dd5U4p9xvX8xCZFgjv8LaT_1M",
      authDomain: "jta-instagram-clone-2991f.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-2991f.firebaseio.com",
      projectId: "jta-instagram-clone-2991f",
      storageBucket: "jta-instagram-clone-2991f.appspot.com",
      messagingSenderId: "1019965827290",
      appId: "1:1019965827290:web:453437c524021382cd9de3"
    };

    firebase.initializeApp(firebaseConfig)
  }
}
