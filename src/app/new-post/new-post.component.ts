import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PostService } from '../services/post.service';
import { Post } from '../models/Post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
	
	postForm:FormGroup;

  constructor(private postService:PostService,
 			  private router:Router,
  			  private formBuilder : FormBuilder) { }

  ngOnInit() {
  	this.initForm();
  }
  initForm(){
  	this.postForm =this.formBuilder.group({
  		title:['', Validators.required],
  		content:['', Validators.required]
  	});
  }
  onSubmitForm(){
  	const formValue = this.postForm.value;
  	const newPost = new Post(
  		formValue['title'],
  		formValue['content']
     );
    newPost.id=this.postService.getPostMaxId();
    newPost.loveIts=0;
    newPost.created_at = new Date();
  	this.postService.addNewPost(newPost);
    
  	
  }
}
