import { Component, OnInit } from '@angular/core';
import { ProjectService} from 'api/services/project.service';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {
  projects:any=[];
  constructor() { }

  ngOnInit(): void {
  }

}
