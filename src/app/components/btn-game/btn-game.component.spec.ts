import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGameComponent } from './btn-game.component';

describe('BtnGameComponent', () => {
  let component: BtnGameComponent;
  let fixture: ComponentFixture<BtnGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
