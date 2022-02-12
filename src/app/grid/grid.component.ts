import { Component,Input, OnInit } from '@angular/core';
import { FlickrService } from '../flickr.service';
import {ifStmt} from "@angular/compiler/src/output/output_ast";


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor(private flickrService:FlickrService) { }
  @Input()
  apiresult!:any
  imgsInfos!:any
  opened:boolean = false


  ngOnInit(): void {
  }
  openPopUp(id:number,secret:string){
    if (!this.opened){
      this.opened = true
      this.flickrService.getImageInfo(id,secret).subscribe(data => {
        data.photo.dates.posted = new Date(parseInt(data.photo.dates.posted)* 1000)
        this.flickrService.searchImages({userId : data.photo.owner.nsid}).subscribe(result => {
          data.photo.ownerArt = result.photos.photo
          this.imgsInfos = data.photo
          var modal = document.getElementById("openPopupModal");
          if(modal){
            modal.click()
            this.opened = false
          }
        })
      })
    }
  }
}
