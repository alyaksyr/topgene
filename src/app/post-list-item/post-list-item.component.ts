import { Component, OnInit,Input } from '@angular/core';
//import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

//import { Post } from '../models/Post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  //posts:Post[];
  //postSubscription : Subscription;
  
  @Input() id : number;
  @Input() title : string;
  @Input() content : string;
  @Input() created_at : Date;
  @Input() loveIts : number;
  @Input() index : number

  
  constructor(private postService: PostService,private router:Router) { }

  ngOnInit() {

  }

  onLovePost(){
    this.postService.lovePost(this.index);
    this.postService.savePost();
  }
  onDontLovePost(){
    this.postService.hatePost(this.index);
    this.postService.savePost();
  }

  onViewPost(){
    this.postService.getPostById(this.id);
    this.router.navigate(['/posts/',this.id]);
  }

  onRemovePost(){
    this.postService.removePost(this.index);
   this.postService.savePost();
  }

  getColor(){
   if (this.loveIts>0) {
     return 'green';
   }else if(this.loveIts<0){
     return'red';
   }
 }

}
