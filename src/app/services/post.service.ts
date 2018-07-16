import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Post } from '../models/Post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private loveIts: number;
  private index: number;
	private posts: Post[]=[];
	postSubject = new Subject<Post[]>();

  constructor(private httpClient: HttpClient, private router:Router) { }

  emitPostSubject(){
  	this.postSubject.next(this.posts);
  }

  addNewPost(post:Post){
  	this.posts.push(post);
    this.savePost();
  	this.emitPostSubject();
  }
  getPostById(id:number){
    return this.posts.find(post=>post.id===id);
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
            //resolve(reponse);
          },
          (error)=>{
            console.log("Erreur de chargement: "+error);
            //reject(error);
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
        this.router.navigate(['/posts']);
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
  lovePost(index:number){
    this.posts[index].loveIts=this.posts[index].loveIts+1;
  }
  hatePost(index:number){
    this.posts[index].loveIts=this.posts[index].loveIts-1;
  }
  getPostMaxId(){
    if (this.posts.length==0){
      return 1;
    }else{
      return this.posts[(this.posts.length-1)].id+1;
    }
  }

}
