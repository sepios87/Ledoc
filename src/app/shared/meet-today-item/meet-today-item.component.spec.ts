import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetTodayItemComponent } from './meet-today-item.component';

describe('MeetTodayItemComponent', () => {
  let component: MeetTodayItemComponent;
  let fixture: ComponentFixture<MeetTodayItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetTodayItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetTodayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
