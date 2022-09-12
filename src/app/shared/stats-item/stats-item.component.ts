import { Component, OnInit } from '@angular/core';
import { Period, Stat } from 'src/app/models/stat';
import { StatService } from './../../services/stat.service';

@Component({
  selector: 'app-stats-item',
  templateUrl: './stats-item.component.html',
  styleUrls: ['./stats-item.component.scss']
})
export class StatsItemComponent implements OnInit {

  stat?: Stat;
  Period = Period;
  currentPeriod!: Period;

  constructor(private _statService: StatService) { }

  ngOnInit(): void {
    this.getStats();
    this.currentPeriod = this._statService.getCurrentPerdiod;
  }

  getStats(): void {
    this._statService.getStats().subscribe(response => {
      this.stat = response;
    })
  }

  onChangeStats(period: Period): void {
    this.currentPeriod = period;
    this._statService.changeStatsPerdiod(period);
  }

}
