import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class ClipComponent implements OnInit {

  id: string='';
  constructor(private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    });
   }

  ngOnInit(): void {
  }

}
