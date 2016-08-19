import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AudioPlayer, AudioSource} from '../../providers/audio-player/audio-player'
import {Observable} from 'rxjs/Observable';
import {AngularFire} from 'angularfire2';

@Component({
  templateUrl: 'build/pages/waxtaanu-fajar/waxtaanu-fajar.html',
  directives: [AudioPlayer]
})
export class WaxtaanuFajarPage {
  private audioSource: AudioSource;
 @ViewChild(AudioPlayer) player: AudioPlayer;
  items: Observable<any[]>;
  playList:any[];
  
  constructor(private nav: NavController, af: AngularFire) {
    this.audioSource = new AudioSource("ChIbSakho 1", "https://firebasestorage.googleapis.com/v0/b/alioune-sall.appspot.com/o/Tafsir%2Ftafsir_04_07_2014.mp3?alt=media&token=4e3cae10-d799-4e3a-8887-a099ceb18da7", 22);
    this.items       = af.database.list('/WaxtaanuFajar');
    this.items.subscribe(values=>{
      this.playList= values;
    });
  }


  ionViewDidEnter() {
    var p = this.player;
  }

  play(src)
  {
    this.player.play(src);

  }

}
