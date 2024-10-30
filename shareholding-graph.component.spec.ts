import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholdingGraphComponent } from './shareholding-graph.component';

describe('ShareholdingGraphComponent', () => {
  let component: ShareholdingGraphComponent;
  let fixture: ComponentFixture<ShareholdingGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareholdingGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareholdingGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
