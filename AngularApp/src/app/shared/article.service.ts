import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Article} from './article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  selectedarticle: Article;
  article: Article[];
  readonly baseURL: string="http://localhost:3000/articles";
  constructor(private http: HttpClient) { }

  postArticle(art: Article){
    return this.http.post(this.baseURL, art);
  }

  getArticle(){
    return this.http.get(this.baseURL);
  }

  putArticle(art: Article){
    return this.http.put(this.baseURL+`/${art._id}`, art);
  }

  deleteArticle(_id:string){
    return this.http.delete(this.baseURL+`/${_id}`);
  }
}
