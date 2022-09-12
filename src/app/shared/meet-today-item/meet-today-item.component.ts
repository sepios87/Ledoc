import { Component, OnInit } from '@angular/core';
import { Meet } from 'src/app/models/meet';
import { MeetService } from './../../services/meet.service';

@Component({
  selector: 'app-meet-today-item',
  templateUrl: './meet-today-item.component.html',
  styleUrls: ['./meet-today-item.component.scss']
})
export class MeetTodayItemComponent implements OnInit {

  meets: Meet[] = [];

  constructor(private _meetService: MeetService) { }

  ngOnInit(): void {
    this.getMeets();
  }

  getMeets(): void {
    this._meetService.getMeets().subscribe((response: any[]) => {
      this.meets = response
      .filter((e: Meet) => new Date().getDate() === new Date(e.date).getDate())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    })
  }

  getPartOfDayMeet(): Meet[] {
    return this.meets.filter(e => {
      if (new Date().getHours() > 12) {
        return new Date(e.date).getHours() > 12;
      }
      return new Date(e.date).getHours() <= 12;
    });
  }

  isNextMeet(meet: Meet) {
    const nextMeet = this.meets
      .filter(e => new Date().getTime() < (new Date(e.date)).getTime())[0];
    return meet == nextMeet;
  }

  getNumberMeetsToday(): number {
    return this.meets.length;
  }

}
