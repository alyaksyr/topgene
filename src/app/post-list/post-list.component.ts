import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../models/Post.model';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements  OnInit, OnDestroy {
	posts:Post[];
  postSubscription : Subscription;
  @Input() index: number;
  @Input() loveIts : number;
  
  
  constructor(private postService: PostService, private router:Router) { }

  ngOnInit() {
    this.postSubscription=this.postService.postSubject.subscribe(
      (posts:Post[])=>{
        this.posts=posts;
      }
    );
    this.postService.getAllPost();
    this.postService.emitPostSubject();
  }
  onLovePost(i:number){
    this.posts[i].loveIts=this.posts[i].loveIts+1;
    this.postService.savePost();
  }
  onDontLovePost(i:number){
    this.posts[i].loveIts=this.posts[i].loveIts-1;
    this.postService.savePost();
  }
  onSavePost(){
    this.postService.savePost();
  }
  onViewPost(i:number){
    this.postService.getPostById(i);
    this.router.navigate(['/posts/'+i]);
  }
  onFetch(){
    this.postService.getAllPost();
  }
  onRemovePost(i:number){
    this.postService.removePost(i);
    /*for (var i = 0; i<this.posts.length; ++i) {
      this.posts[i].id=i+1;
    }*/
    this.postService.savePost();
  }
  getColor(){
   if (this.posts['loveIts']>0) {
     return 'green';
   }else if(this.posts['loveIts']<0){
     return'red';
   }
 }
  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }
}
