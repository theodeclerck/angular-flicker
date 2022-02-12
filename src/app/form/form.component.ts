import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlickrService } from '../flickr.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  flickerFilter: FormGroup;
  hotTags:any
  imgsArray!:any
  pageInfos:any
  previousForm:any
  constructor(fb: FormBuilder,private flickrService:FlickrService) {
    this.flickerFilter = fb.group({
      'text': null,
      'minUploadDate': null,
      'maxUploadDate': null,
      'minTakenDate': null,
      'maxTakenDate': null,
      'sort': null,
      'tags': null,
    })
  }

  ngOnInit(): void {
    this.flickrService.getHotTags().subscribe(data => {
      this.hotTags = data.hottags.tag
    })
  }

  onSubmit(form : FormGroup){
    this.triggerSearch(form);
    this.previousForm = form;
    if (!this.previousForm.page){
      this.previousForm.page = 1;
    }
  }

  triggerSearch(form :any){
    if (form.minUploadDate){
      let date = form.minUploadDate
      form.minUploadDate = new Date(date)
    }
    if (form.maxUploadDate){
      let date = form.maxUploadDate
      form.maxUploadDate = new Date(date)
    }
    if (form.minTakenDate){
      let date = form.minTakenDate
      form.minTakenDate = new Date(date)
    }
    if (form.maxTakenDate){
      let date = form.maxTakenDate
      form.maxTakenDate = new Date(date)
    }
    this.flickrService.searchImages(form).subscribe(data => {
      this.imgsArray = data.photos.photo;
      this.pageInfos = data;
      let pagination = document.getElementsByClassName("paginationId")
      if (pagination){
        let i = 0
        while(i < pagination.length){
          pagination[i].classList.remove("hidden")
          i++;
        }
      }
    })
  }

  paginationSearch(flag:boolean){
    if (this.previousForm){
      this.previousForm.page = flag ? this.previousForm.page + 1 : this.previousForm.page - 1
    }
    this.triggerSearch(this.previousForm);
  }
}
