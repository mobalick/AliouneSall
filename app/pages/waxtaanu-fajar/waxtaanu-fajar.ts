import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AudioPlayer, AudioObject} from '../../providers/audio-player/audio-player'
/*
  Generated class for the WaxtanuFajarPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/waxtaanu-fajar/waxtaanu-fajar.html',
  directives : [AudioPlayer]
})
export class WaxtaanuFajarPage {
  private audioObject : AudioObject;
  constructor(private nav: NavController) {
      this.audioObject = new AudioObject("ChIbSakho 1","https://firebasestorage.googleapis.com/v0/b/alioune-sall.appspot.com/o/Tafsir%2Ftafsir_04_07_2014.mp3?alt=media&token=4e3cae10-d799-4e3a-8887-a099ceb18da7",22);
  }
 private setName()
 {
   this.audioObject.name="tututut";
 }
}
