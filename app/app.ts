import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, MenuController, Nav } from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {FIREBASE_PROVIDERS, defaultFirebase, FirebaseAuth, firebaseAuthConfig, AuthMethods, AuthProviders,AngularFire} from 'angularfire2';
import {NotificationService} from './providers/notification-service/notification-service';
import {HomePage} from './pages/home/home';
import {WaxtaanuFajarPage} from './pages/waxtaanu-fajar/waxtaanu-fajar';
import {TafsirPage} from './pages/tafsir/tafsir';
import {ConferencePage} from './pages/conference/conference';
import {AboutPage} from './pages/about/about';
import { AudioPlayer, AudioSource} from './providers/audio-player/audio-player'


@Component({
  template: `
    <ion-menu [content]="content">
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
      <ion-content>
        <ion-list>
          <ion-list-header>
             Navigate
          </ion-list-header>
          
          <button ion-item (click)="openPage(homePage)">
            <ion-icon  item-left name="home"></ion-icon>
            Home
          </button>

          <button ion-item (click)="openPage(waxtaanuFajarPage)">
            <ion-icon  item-left name="information-circle"></ion-icon>
            Waxtaanu Fajar
          </button>

          <button ion-item (click)="openPage(tafsirPage)">
            <ion-icon  item-left name="megaphone"></ion-icon>
            Tafsir
          </button>
          
          <button ion-item (click)="openPage(conferencePage)">
            <ion-icon  item-left name="calendar"></ion-icon>
            Conference
          </button>
        </ion-list>
        <ion-list>
          <ion-list-header>
             Account
          </ion-list-header>
          <button ion-item (click)="openPage(aboutPage)">
            <ion-icon  item-left name="contact"></ion-icon>
            About
          </button>

        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-nav id="nav" #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage : any              = HomePage;
  private homepage            = HomePage;
  private tafsirPage          = TafsirPage;
  private waxtaanuFajarPage   = WaxtaanuFajarPage;
  private conferencePage      = ConferencePage;
  private aboutPage           = AboutPage;
  @ViewChild(Nav) nav: Nav;

  
  constructor(platform: Platform, private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }


   openPage(page) {
      // Reset the nav controller to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page);

      // close the menu when clicking a link from the menu
      this.menu.close();
  }
}

ionicBootstrap(MyApp, [FIREBASE_PROVIDERS,NotificationService,  AngularFire, AudioPlayer,
                                                                      defaultFirebase({
                                                                          apiKey: "AIzaSyAwdjyq9VZ8PzxN2qLnkgcYphwWDrv0h98",
                                                                          authDomain: "alioune-sall.firebaseapp.com",
                                                                          databaseURL: "https://alioune-sall.firebaseio.com",
                                                                          storageBucket: "alioune-sall.appspot.com",
                                                                        })
                       
                      ]);

