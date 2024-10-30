import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholdingdataComponent } from './shareholdingdata.component';

describe('ShareholdingdataComponent', () => {
  let component: ShareholdingdataComponent;
  let fixture: ComponentFixture<ShareholdingdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareholdingdataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareholdingdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
