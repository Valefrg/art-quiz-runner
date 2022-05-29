import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaserAnimationComponent } from './phaser-animation.component';

describe('PhaserAnimationComponent', () => {
  let component: PhaserAnimationComponent;
  let fixture: ComponentFixture<PhaserAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaserAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaserAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
