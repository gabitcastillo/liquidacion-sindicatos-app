import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLiquidacionComponent } from './list-liquidacion.component';

describe('ListLiquidacionComponent', () => {
  let component: ListLiquidacionComponent;
  let fixture: ComponentFixture<ListLiquidacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLiquidacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLiquidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
