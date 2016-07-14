import { Injectable, Component , Input} from '@angular/core';

export class Audio {
  name  : string;
  url   : string;
  id    : number;

  constructor(name: string, url:string, id:number) {
    this.name   = name;
    this.url    = url;
    this.id     = id;
  }
}
@Component({
  selector: 'audio-player',
  template: `
    {{audio.name}}
  `
})
export class AudioPlayer {
  @Input()
  audio : Audio;
  constructor() {

  }

 
}

