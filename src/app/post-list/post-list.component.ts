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
  
  constructor(private postService: PostService, private router:Router) { }

  ngOnInit() {  
    this.postSubscription=this.postService.postSubject.subscribe(
      (posts:Post[])=>{
        this.posts=posts;
      }
    );
    this.postService.getAllPost()
    .then((value : any) => {
      this.posts = value;
      console.log(value);
    })
    .catch((err : any) => {
      console.log(err);
    });

     this.postService.emitPostSubject();
  }
  onNewPost(){
    this.router.navigate(['/new-post']);
  }
  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }
}
