import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ledoc-front';
  currentUrl?: string;

  constructor(private _router: Router) { }

  ngOnInit() {
    this._router.events
      .pipe(filter(event => event instanceof RoutesRecognized))
      .subscribe((event: any) => {
        this.currentUrl = event.url.split('/')[1];
      });
  }

}
