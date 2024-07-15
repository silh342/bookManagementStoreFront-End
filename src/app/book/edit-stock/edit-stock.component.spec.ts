import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockComponent } from './edit-stock.component';

describe('EditStockComponent', () => {
  let component: EditStockComponent;
  let fixture: ComponentFixture<EditStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [EditStockComponent]
});
    fixture = TestBed.createComponent(EditStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
