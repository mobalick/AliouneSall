import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AudioPlayer, Audio} from '../../providers/audio-player/audio-player'
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
  private audio : Audio;
  constructor(private nav: NavController) {
      this.audio=new Audio("toto","http://toto.com",22);
  }

}
