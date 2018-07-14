import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/Post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private loveIts:number;
	private posts: Post[]=[];
	postSubject = new Subject<Post[]>();

  constructor(private httpClient: HttpClient ) { }

  emitPostSubject(){
  	this.postSubject.next(this.posts);
  }

  addNewPost(post:Post){
  	this.posts.push(post);
    this.savePost();
  	this.emitPostSubject();
  }
  getPostById(id:number){
    const post = this.posts.find(
      (postObject)=>{
        return postObject.id===id;
      }
    );
    return post;
  }
  getAllPost(){
    return new Promise(
      (resolve, reject)=>{
        this.httpClient
        .get<Post[]>('https://blog-togene.firebaseio.com/posts.json')
        .subscribe(
          (reponse)=>{
            this.posts= reponse;
            this.emitPostSubject();
          },
          (error)=>{
            console.log("Erreur de chargement: "+error);
          }
        );
      }
    );
  }
  savePost(){
    this.httpClient
    .put('https://blog-togene.firebaseio.com/posts.json',this.posts)
    .subscribe(
      ()=>{
        console.log("Enregistrement terminé! ");
      },
      (error)=>{
        console.log("Eche d'enregistrement: "+error);
      }
    );
  }
  removePost(index:number){
    return new Promise(
      (resolve,reject)=>{
        this.posts.splice(index,1);
        console.log("Le post a été supprimé avec sucès !");
      }
    );
  }
  getPostMaxId(){
    if (this.posts.length==0){
      return 1;
    }else{
      return this.posts[this.posts.length-1].id+1;
    }
  }
}
