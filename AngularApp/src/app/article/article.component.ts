import { Component, OnInit } from '@angular/core';

import {ArticleService} from '../shared/article.service';
import { NgForm } from '@angular/forms';
import {Article} from '../shared/article.model';

declare var M:any;
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers:[ArticleService]
})
export class ArticleComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.resetform();
    this.refresharticlelist();
  }
resetform(form?:NgForm){
  if(form)
    form.reset();
    this.articleService.selectedarticle={
      _id:'',
      title:"",
      url:""
    }
}

onSubmit(form?:NgForm){
  if(form.value._id == ''){
  this.articleService.postArticle(form.value).subscribe((res)=>{
    this.resetform(form);
    this.refresharticlelist();
    M.toast({html:"Saved Successfully", classes:'rounded'});
  });
}
else{
  this.articleService.putArticle(form.value).subscribe((res)=>{
    this.resetform(form);
    this.refresharticlelist();
    M.toast({html:"Updated Successfully", classes:'rounded'});
  });
}
}

refresharticlelist(){
  this.articleService.getArticle().subscribe((res)=>{
    this.articleService.article = res as Article[];
  });
}

onEdit(art: Article){
  this.articleService.selectedarticle = art;
}

onDelete(_id: string, form: NgForm){
  if(confirm('Are you sure to delete this record?')==true){
    this.articleService.deleteArticle(_id).subscribe((res)=>{
      this.resetform(form);
      this.refresharticlelist();
      M.toast({html:"Deleted Successfully", classes:'rounded'});
    })
  }

}
}
