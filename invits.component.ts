import { Component,AfterViewInit,ViewChild,ChangeDetectorRef, ChangeDetectionStrategy, inject, Inject, OnInit  } from '@angular/core';
import { IalalertserviceService } from '../common-components/ialalertbox/ialalertservice.service';
import { AlertType } from '../type/commonConstants';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MultiselectautocompleteComponent } from '../common-components/multiselectautocomplete/multiselectautocomplete.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PerformanceServiceService } from '../service/performance.service.service';
import { MatTable } from '@angular/material/table';
import { InvitDetailsService } from '../service/invit-details.service';
import { catchError } from 'rxjs';
import { SectorsubsectionUIComponent } from '../common-components/sectorsubsection-ui/sectorsubsection-ui.component';
import { CommonModule } from '@angular/common';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {NestedTreeControl,FlatTreeControl} from '@angular/cdk/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTreeNestedDataSource, MatTreeModule,MatTreeFlatDataSource,MatTreeFlattener} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ShareholdingdataComponent } from "./shareholdingdata/shareholdingdata.component";
import { RatingComponent } from "./rating/rating.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InvitTypemodel } from '../models/performancemodel';
import { FinancialComponent } from './financial/financial.component';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderComponent } from '../common-components/loader/loader.component';
import { SpvAnalyzer } from '../models/SpvAnalyzerModel';
import { SectorList } from '../type/commonConstants';
import { MapComponent } from './map/map.component';
import { MapchartComponent } from '../mapchart/mapchart.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface spv {
  spvname: string;
  value: string;
  key: string;
 
}




@Component({
  selector: 'app-invits',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MultiselectautocompleteComponent,
    MatSelectModule, SectorsubsectionUIComponent, CommonModule, MatTableModule, MatPaginatorModule, MatTreeModule, MatButtonModule,
    MatIconModule, MatTooltipModule, ShareholdingdataComponent, MatDialogModule, RatingComponent, FinancialComponent, MapComponent,MatProgressBarModule,LoaderComponent,
    MatButtonToggleModule,CommonModule,MapchartComponent],
  templateUrl: './invits.component.html',
  styleUrl: './invits.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitsComponent implements AfterViewInit,OnInit  {
  readonly dialog = inject(MatDialog);
[x: string]: any;
  myForm: FormGroup ;
  Formdatalists:any;
  LstEntity:any;
  LstProfile:any;
  LstSPVDetails:any;
  LstSPVColumns:any;
  ismapget:boolean=false;
 Lstdata:any;
 displaycolumns:any;
 totalrecords!:number;
 obj:any;
 SectorId:number;
 LstShareholdingdata: any;
 LstManagementdata=new MatTableDataSource<any>();
 count=0;
 Issubmit:boolean=false;
 totalmngmntrecords!:number;
 ispageloaded:boolean=true;
 ISsector:boolean=true;
 Isentity:boolean=true;
 //treeControl = new NestedTreeControl<ShareHoldingNode>(node => node.children);
 loaded!: boolean;
 isLoadingProf:boolean=false;
 isLoadingSharehold:boolean=false;
 isLoadingspv:boolean=false;
 isLoadingfinc:boolean=false;
 isLoadingrating:boolean=false;
 isLoadingmngmnt:boolean=false;
 inputobj:any;
 InputData: SpvAnalyzer = new SpvAnalyzer;
  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  
   //treeControl = new NestedTreeControl<ShareHoldingNode>(node => node.children);


  //displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  displayManagementColumns: string[] = ['NAME', 'DESIGNATION', 'QUALIFICATIONS','AGE','EXPERIENCE','DINNO'];
 // displaycolumn1:string[]=['entityId','lTorST','ratingDate', 'ratingBy', 'amount', 'rating','instrument','ratingId'];
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  //data: PeriodicElement[] = ELEMENT_DATA;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('mngmnttpaginator') mngmnttpaginator!: MatPaginator;
  @ViewChild(MatTable, {static: false}) table! : MatTable<any>;
  ngAfterViewInit() {
    this.Lstdata.paginator! = this.paginator;
    this.LstManagementdata.paginator!=this.mngmnttpaginator;
  }
constructor(private customDialog: IalalertserviceService,private fb: FormBuilder,private router: Router,private service:InvitDetailsService
 , private cdr: ChangeDetectorRef
){
  this.inputobj=[];
  this.Issubmit=false;
  this.SectorId=1;
  this.myForm = this.fb.group({
    SubSectorId: ['', Validators.required],
    EntityId: ['', Validators.required],
  });
  this.displaycolumns=[];  
  /*this.service.getSubSectorList(this.SectorId).subscribe({
    next: (data: any) => {
      if(data.success){
       // debugger;
       this.ISsector=false;
        this.Formdatalists=data.data;
      }
    }})*/

    
if(!this.ISsector && !this.Isentity)
{
  this.ispageloaded=false;
}
      
}
  ngOnInit(): void {
    setTimeout(() => (this.loaded = true),5000);
    if(this.ISsector===false && this.Isentity===false)
      {
        this.ispageloaded=false;
      }
      this.InputData.LstSector = SectorList;
  }

  UpdateSubSector(SelObj: any) {
    this.service.getSubSectorList(SelObj).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.InputData.LstSubSector = data.data;
          this.ISsector=false;
        this.Formdatalists=data.data;
          //this.getCookie("XSRF-TOKEN");
        }
      }
    })
  };

  changeentity(SelObj: any) {
   

    this.service.getEntityList(SelObj).subscribe({
      next: (data: any) => {
        if(data.success){
         // debugger;
         this.Isentity=false;
          this.LstEntity=data.data;
        }
      }})
  };
public get Sector() { return this.myForm.get('SubSectorId') as FormControl };
public get Entity() { return this.myForm.get('EntityId') as FormControl };
resetForm() {
  // this.myForm.reset({
  //   name: ''
  // })
  this.myForm.reset();
}
onsubmit(){
  this.count=this.count+1;
  this.displaycolumns=[];
  this.Issubmit=true;
  this.isLoadingProf=true;
  this.isLoadingspv=true;
  this.isLoadingfinc=true;
  this.isLoadingrating=true;
  this.isLoadingmngmnt=true;
  this.inputobj=[];
  this.inputobj.push({'SubSectorId':this.myForm.value.SubSectorId,
    'EntityId':this.myForm.value.EntityId
  });
  this.service.PostSearchData(this.myForm.value).subscribe({
    
    next: (data: any) => {
      if(data.success){
       // debugger;
        this.LstProfile=data.data;
        this.isLoadingProf=false;
        console.log(this.LstProfile);
      }
      //data.console.error();
      else{
        this.isLoadingProf=false;
      }
      
    },
      error: (err) => {
        alert('There was an error in retrieving profile data from the server');
  }
  });
  this.Lstdata=[];
  this.displaycolumns=[];
    this.service.PostSPVData(this.myForm.value).subscribe({
      next: (data: any) => {
        if(data.success){
         // debugger;
         this.Lstdata = new MatTableDataSource ();
          this.LstSPVDetails=data.data;
          this.LstSPVColumns= this.LstSPVDetails.lstColumns;
          console.log("columns");
          console.log(this.LstSPVColumns);
          setTimeout(() =>{
            
          },5000);
          //this.Lstdata=data.data.lstdt;
          this.ismapget=true;
          this.Lstdata = new MatTableDataSource (data.data.lstdt);
                
            this.displaycolumns=this.LstSPVColumns.map((p: { key: any; })=>p.key);
  console.log(this.Lstdata);
 
       console.log("columns1");
       console.log(this.displaycolumns);
this.cdr.detectChanges();
          this.totalrecords=data.data.lstdt.length;
          this.Lstdata.paginator=this.paginator;
          this.paginator._changePageSize(this.paginator.pageSize); 
         // this.displaycolumns.push('SPVName');
          //for (var val of this.LstSPVColumns) {
           // this.displaycolumns.push(val.key);
       // }
       
        var c: number = 0;

        for (c; c < this.Lstdata.length; c++) {
          var d: number = 0;
        //for (let column of this.displaycolumns){
          for (d; d < this.displaycolumns.length; d++) {
            var obj1=this.displaycolumns[d];
          
           
         // var s: number = 0;
          //for (s; s < c.length; s++) {

          //}
        }
      }
      this.isLoadingspv=false;
        console.log(this.obj);
        }
        else{
          this.isLoadingspv=false;
        }
        //data.console.error();
        
      },
      error: (err) => {
        alert('There was an error in retrieving spv data from the server');
  }
    });

      // this.service.PostShareHoldingData(this.myForm.value).subscribe({
      //   next: (data: any) => {
      //     if(data.success){
      //      // debugger;
      //       this.LstShareholdingdata=data.data;
    
          
      //     }
      //     data.console.error();
          
      //   }});
      
  console.log(this.myForm.value);

//Shareholdingdata

this.service.PostManagementData(this.myForm.value).subscribe({
  next: (data: any) => {
    if(data.success){
     // debugger;
      this.LstManagementdata=new MatTableDataSource(data.data);
this.cdr.detectChanges();
      
      
      setTimeout(() =>{
        this.LstManagementdata.paginator=this.mngmnttpaginator;    
        this.mngmnttpaginator._changePageSize(this.mngmnttpaginator.pageSize);     
      },5000);
      this.totalmngmntrecords=data.data.length;
// this.cdr.detectChanges();

      // this.LstManagementdata.paginator=this.mngmnttpaginator;
     // this.displaycolumns.push('SPVName');
      //for (var val of this.LstSPVColumns) {
       // this.displaycolumns.push(val.key);
   // }
   //this.displaycolumns=this.LstSPVColumns.map((p: { key: any; })=>p.key);
    //var c: number = 0;

    this.isLoadingmngmnt=false;
    
    console.log(this.obj);
    }
    else{
      this.isLoadingmngmnt=false;
    }
    //data.console.error();
    
  },
  error: (err) => {
    alert('There was an error in retrieving management data from the server');
}
});

}
openDialog(mngdetails:any) {
  const dialogRef = this.dialog.open(DialogContentExampleDialog,{
    width: '600x',
    height: '400px',
    data: {
      dataKey: mngdetails
    }
    });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}


}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'manager.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatTableModule, MatPaginatorModule,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {
LstDirector:any;
Directorinput!: { EntityId: number, DINNO: string };
Totalrec=0;

//disdirectorColumns: any;
lstcols:any;
disdirectorColumns:string[] = ['name', 'companyName', 'beginDate', 'endDate','activeCompliance'];
  
  @ViewChild(MatPaginator)paginator!: MatPaginator;
  myForm: any;

  ngAfterViewInit() {
    this.LstDirector.paginator = this.paginator;
  }
constructor( @Inject(MAT_DIALOG_DATA) public data: any,private customDialog: IalalertserviceService,private fb: FormBuilder,private router: Router,private service:InvitDetailsService
, private cdr: ChangeDetectorRef
)
{
  this.Directorinput= new InvitTypemodel;

  this.Directorinput.EntityId=data.dataKey["entityId"];
  this.Directorinput.DINNO=data.dataKey["dinno"].toString();
  console.log(this.Directorinput);
  this.service.GetDirectorData(this.Directorinput).subscribe({
    next: (data: any) => {
      if(data.success){
       // debugger;
        this.LstDirector=new MatTableDataSource<any>(data.data.lstDirector);
        this.lstcols=data.data.lstdircols;
        this.cdr.detectChanges();
        this.Totalrec=this.LstDirector.length;
        //this.disdirectorColumns=this.lstcols.map((p: { key: any; })=>p.key);
      }
     
      
    },
    error: (err) => {
      alert('There was an error in retrieving profile data from the server');
}
  });
}


}