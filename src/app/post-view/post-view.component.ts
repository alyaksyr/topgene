import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/Post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  
  post:Post;
  title:string;
  content:string;
  loveIts:number;
  created_at:Date;

  constructor(private postService: PostService, private router: ActivatedRoute) {}

  ngOnInit() {
  	const id = +this.router.snapshot.paramMap.get('id');
  	this.post=this.postService.getPostById(id);

  }

  getLove(){

  }
  getHate(){

  }
}
