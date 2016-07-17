import { Injectable, Component , Input, } from '@angular/core';

export class AudioObject {
  name  : string;
  url   : string;
  id    : number;
  position : number;
  duration : number;
  constructor(name: string, url:string, id:number) {
    this.name     = name;
    this.url      = url;
    this.id       = id;
    this.position = 0;
    this.duration = 100;
  }
}
@Component({
  selector: 'audio-player',
  template: `
  <ion-card>
    Name : {{audioObject.name}} <br/>
  </ion-card>

        <div class="audio-player">

          <ion-item *ngIf="state=='play'|| state=='pause' ">
          
            <ion-range [(ngModel)]="_progress" min="0" [max]="_duration" step="0.01" (ionChange)="seekTo($event)" >
               <div range-left small >{{ formatTime(audio.currentTime) }}</div>
               <div range-right small >{{ formatTime(audio.duration) }}</div>
            </ion-range>
          </ion-item>
          <ion-row>
            <ion-col>
              <button primary clear right (click)="previousTrack()">
                <ion-icon name="skip-backward"></ion-icon>
              </button>
            </ion-col>

            <ion-col *ngIf="!isPlaying" class="btn-center">
              <button primary clear (click)="play()">
                <ion-icon name="play"></ion-icon>
              </button>
            </ion-col>

            <ion-col *ngIf="isPlaying" class="btn-center">
              <button primary clear (click)="pause()">
                <ion-icon name="pause" *ngIf="!isPaused"></ion-icon>
                <ion-icon name="play" *ngIf="isPaused"></ion-icon>
              </button>
            </ion-col>

            <ion-col *ngIf="isPlaying" class="btn-center">
              <button primary clear  (click)="stop()">
                <ion-icon name="square"></ion-icon>
              </button>
            </ion-col>

             <ion-col class="btn-end">
              <button primary clear (click)="nextTrack()">
                <ion-icon name="skip-forward"></ion-icon>
              </button>
            </ion-col>
            
          </ion-row>

        </div>
  `
})
export class AudioPlayer {
  @Input()
  audioObject     : AudioObject;
  playList        : [AudioObject];
  isPlaying       : boolean;
  isPaused        : boolean;
  state           : string;
  audio           : HTMLAudioElement;
  _progress : number;
  _completed :number;
  _duration : number;

  constructor() {
    this.isPlaying=false;
   
  }
  
  public previousTrack()
  {

  }
 
  public nextTrack()
  {
    this._duration=2000;
  }

  public play()
  {
    this.setPlayerState("play");
    this.audio.play();
  }

  public pause()
  {
    this.setPlayerState("pause");
    if (this.audio.paused) {
      this.audio.play();
    }else {
      this.audio.pause();  
    }
  }

  public stop()
  {
    this.setPlayerState("stop");
    this.audio.pause();
    this.audio.currentTime = 0;
    this._progress=0;
  }
 
  public seekTo(ev) {
    this.audio.currentTime = ev.value;  
  }


 private setPlayerState(state : string)
 {
   this.state = state;

   switch(state)
   {
     case "play" :
        this.isPlaying = true;
        this.isPaused  = false;
        break;
     case "pause" : 
        this.isPaused = this.isPlaying && !this.isPaused;
        break;
     case "stop" : 
        this.isPlaying=false;
     break; 
   }
 }

private formatTime(value:number) {
  
    let s = Math.trunc(value % 60);
    let m = Math.trunc((value / 60) % 60);
    let h = Math.trunc(((value / 60) / 60) % 60);  
    return h > 0 ? `${h<10?'0'+h:h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}` : `${m<10?'0'+m:m}:${s<10?'0'+s:s}`;
  } 

  private onTimeUpdate(e: Event) {
    if (this.isPlaying && this.audio.currentTime > 0) {
      this._progress = this.audio.currentTime;
      this._completed = this.audio.duration > 0 ? Math.trunc (this.audio.currentTime / this.audio.duration * 100)/100 : 0;
    }  
  }

public getDuration = function (val) {
    return new Date(0, 0, 0, 0, 0, val);
 };

  ngOnInit() {
     this.audio = new Audio(this.audioObject.url);

    this.audio.addEventListener("durationchange", (e:any) => {    
      this._duration = e.target.duration;
    }, false);  

    this.audio.addEventListener("timeupdate", (e) => { this.onTimeUpdate(e); }, false);

    this.audio.addEventListener("error", (err) => {
      console.log(`Audio error => track ${this.audioObject.url}`, err);
      this.isPlaying = false;
    }, false);
  }


}