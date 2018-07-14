import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() titlePost: string;
  @Input() contentPost: string;
  @Input() loveIts: number;
  created_at = new Date();
  
  constructor() { }

  ngOnInit() {

  }
  onLovePost(){
    this.loveIts=this.loveIts+1;
  }
  getNotLove(){
    this.loveIts=this.loveIts-1;
  }
  getColor(){
   if (this.loveIts>0) {
     return 'green';
   }else if(this.loveIts<0){
     return'red';
   }
 }

}
