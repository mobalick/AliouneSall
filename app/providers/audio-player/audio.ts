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