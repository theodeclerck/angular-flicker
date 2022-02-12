import { Component,Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FlickrService } from '../flickr.service';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(private modalService: NgbModal,private flickrService:FlickrService) { }

  @Input()
  popUpData:any


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'xl',backdrop: 'static', keyboard: false}).result.then((result) => {});
  }

  ngOnInit(): void {
  }

}
