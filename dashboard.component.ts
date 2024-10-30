import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccountServiceService } from '../service/account.service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Forjery } from '../models/login.model';
import { HttpClient } from '@angular/common/http';
import { IalalertserviceService } from '../common-components/ialalertbox/ialalertservice.service';
import { CommonModule } from '@angular/common';
import { AlertType, SubSectors } from '../type/commonConstants';
import { DashboardService } from '../service/dashboard.service';
import { SectorsubsectionUIComponent } from '../common-components/sectorsubsection-ui/sectorsubsection-ui.component';
import { DasboardsubsectionUiComponent } from '../common-components/dasboardsubsection-ui/dasboardsubsection-ui.component';
import { Route, Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderComponent } from '../common-components/loader/loader.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    SectorsubsectionUIComponent,
    DasboardsubsectionUiComponent,
    MatProgressBarModule,
    LoaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit,AfterViewChecked,AfterViewInit{
  myForm: FormGroup | undefined;
  myForgery: Forjery | undefined;
  isvisible:boolean=false;
  TestProduct:any="test";
  Dashboarddatalists: any;
  Subsector: typeof SubSectors = SubSectors;
  LoadMatProgressBar:boolean=false;
  @ViewChild('datasection',{static: false})datasection!: ElementRef;
  shouldSroll:boolean= false;
  constructor(private login: AccountServiceService,  private fb: FormBuilder,private customDialog: IalalertserviceService, private service: DashboardService, private router: Router){
  }
  ngAfterViewInit(): void {
  }
  
  
    getDashboardData(id:any)
    {
      this.LoadMatProgressBar=true;
      this.isvisible=true;
      this.service.GetDashboardFieldDatas(id).subscribe({
        next: (data: any) => {
          if(data.success){
            console.log(this.Dashboarddatalists);
            this.Dashboarddatalists=data.data;
            this.LoadMatProgressBar=false;
            this.shouldSroll= true;
          }
        }})
        this.scrollToSection();
    }

    ngAfterViewChecked()
    {
      if(this.shouldSroll)
      {
        this.scrollToSection();
        this.shouldSroll= false;
      }
    }
  ngOnInit(): void {
    
    this.myForm = this.fb.group({
      UserName: ['test', Validators.required],
      Password: ['poodufsaes', Validators.required],
    });//this.myForm .value
    // this.login.GenerateForgeryToken().subscribe({
    //   next: (data: any) => {
    //    this.TestProduct=data;
     

       
    //   }})


  }
  scrollToSection()
  {
    debugger;
    if(this.datasection)
      this.datasection.nativeElement.scrollIntoView({behavior:'smooth',block:'start'});

  }
  // gotoInvits()
  // {
  //   this.router.navigateByUrl('/home/invits');
  // }
  open(){
    this.customDialog.AlertHtml("Data get successfully",AlertType.SuccessAlert);
  }
}
