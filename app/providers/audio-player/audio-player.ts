import { Injectable, Component , Input, } from '@angular/core';

export class AudioSource {
  title  : string;
  url   : string;
  id    : number;
  position : number;
  duration : number;
  constructor(title: string, url:string, id:number) {
    this.title    = title;
    this.url      = url;
    this.id       = id;
    this.position = 0;
    this.duration = 100;
  }
}
@Component({
  selector: 'audio-player',
  template: `
        <div class="audio-player" *ngIf="isInitialized">
          <ion-card>
            Name : {{source.title}} <br/>
          </ion-card>

          <ion-item *ngIf="state=='play'|| state=='pause' ">
            <ion-range [(ngModel)]="_progress" min="0" [max]="_duration" step="0.01" (ionChange)="_seekTo($event)" >
               <div range-left small >{{ _formatTime(audio.currentTime) }}</div>
               <div range-right small >{{ _formatTime(audio.duration) }}</div>
            </ion-range>
          </ion-item>

          <ion-row>
            <ion-col>
              <button primary clear right (click)="_previousTrack()">
                <ion-icon name="skip-backward"></ion-icon>
              </button>
            </ion-col>

            <ion-col *ngIf="!isPlaying" class="btn-center">
              <button primary clear (click)="_play()">
                <ion-icon name="play"></ion-icon>
              </button>
            </ion-col>

            <ion-col *ngIf="isPlaying" class="btn-center">
              <button primary clear (click)="_pause()">
                <ion-icon name="pause" *ngIf="!isPaused"></ion-icon>
                <ion-icon name="play" *ngIf="isPaused"></ion-icon>
              </button>
            </ion-col>

            <ion-col *ngIf="isPlaying" class="btn-center">
              <button primary clear  (click)="_stop()">
                <ion-icon name="square"></ion-icon>
              </button>
            </ion-col>

             <ion-col class="btn-end">
              <button primary clear (click)="_nextTrack()">
                <ion-icon name="skip-forward"></ion-icon>
              </button>
            </ion-col>
            
          </ion-row>

        </div>
  `
})
export class AudioPlayer {
  @Input()
  source          : AudioSource;
  @Input()
  playList        : [AudioSource];
  isPlaying       : boolean;
  isPaused        : boolean;
  state           : string;
  audio           : HTMLAudioElement;
  isInitialized   : boolean
  _progress       : number;
  _completed      : number;
  _duration       : number;

  constructor() {
    this.isPlaying=false;
   
  }
  
  private _previousTrack()
  {

  }
 
  private _nextTrack()
  {
    this._duration=2000;
  }

  private _play()
  {
    this._setPlayerState("play");
    this.audio.play();
  }

  private _pause()
  {
    this._setPlayerState("pause");
    if (this.audio.paused) {
      this.audio.play();
    }else {
      this.audio.pause();  
    }
  }

  private _stop()
  {
    this._setPlayerState("stop");
    this.audio.pause();
    this.audio.currentTime = 0;
    this._progress=0;
  }
 
  private _seekTo(ev) {
    this.audio.currentTime = ev.value;  
  }


 private _setPlayerState(state : string)
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

 private _formatTime(value:number) {
  
    let s = Math.trunc(value % 60);
    let m = Math.trunc((value / 60) % 60);
    let h = Math.trunc(((value / 60) / 60) % 60);  
    return h > 0 ? `${h<10?'0'+h:h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}` : `${m<10?'0'+m:m}:${s<10?'0'+s:s}`;
  } 

  private _onTimeUpdate(e: Event) {
    if (this.isPlaying && this.audio.currentTime > 0) {
      this._progress = this.audio.currentTime;
      this._completed = this.audio.duration > 0 ? Math.trunc (this.audio.currentTime / this.audio.duration * 100)/100 : 0;
    }  
  }

  ngOnInit() {
    this._initAudio();
  }

  private _initAudio()
  {
    if(this.source==null && this.playList==null)
      return;

    if(this.source == null) 
      this.source=this.playList[0]; 
    
    this.audio = new Audio(this.source.url);

    this.audio.addEventListener("durationchange", (e:any) => {    
      this._duration = e.target.duration;
    }, false);  

    this.audio.addEventListener("timeupdate", (e) => { this._onTimeUpdate(e); }, false);

    this.audio.addEventListener("error", (err) => {
      console.log(`Audio error => track ${this.source.url}`, err);
      this.isPlaying = false;
    }, false);

    this.isInitialized = true;
  }

  public play(src)
  {
    if(this.isInitialized)
      this._stop();

    this.source = src;
    this._initAudio();
    
    this._play()
  }

}