import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
//import { FormGroup ,FormsModule} from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import { InvitDetailsService } from '../../service/invit-details.service';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatOptionSelectionChange } from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import * as _ from 'lodash';
@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [MatTabsModule,MatTableModule, MatPaginatorModule,CommonModule,FormsModule,MatInputModule,MatSelectModule,MatFormFieldModule,
    MatButtonToggleModule , ReactiveFormsModule
  ],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.css'
})
export class FinancialComponent implements OnChanges {

  displayedColumns:string[]=[];

  totalrecords=0;
  //displaycolumns:any;
  lsttab=['Consolidated','Standalone']
  
  lstcols:any;
  @Input() public myFormval!: FormGroup; 
  @Input()  count: any;
  dataSource = new MatTableDataSource<any>();
  dataSourcestd= new MatTableDataSource<any>();
  catdatasource:any;
  catApiresponse:any;
  stdApiresponse:any;
  tabIndex:number=0;
  @ViewChild('paginator')  paginator!: MatPaginator;
  @ViewChild('paginator1')  paginator1!: MatPaginator;
  @ViewChild("mattabgroup", { static: false })  mattabgroup!: MatTabGroup;
  filterDictionary: any;
tab: any;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourcestd.paginator = this.paginator1;
    //window.setTimeout(() => this.syncPaginators(this.paginator, this.paginator, this.paginator1));
  }
 // public syncPaginators(event): void {
   // this.paginator1.length = this.paginator2.length = event.length;
 //   this.paginator1.pageIndex = this.paginator2.pageIndex = event.pageIndex;
  //  this.paginator1.pageSize = this.paginator2.pageSize = event.pageSize;
constructor(private router: Router,private service:InvitDetailsService, private cdr: ChangeDetectorRef)
{
 
}
  ngOnChanges(changes: SimpleChanges): void {
    if(this.count>=1){
      this.service.GetFinancialData(this.myFormval).subscribe({
        next: (data: any) => {
          if(data.success){
            debugger;
this.catApiresponse=data.data.lstConsolidData;
this.stdApiresponse=data.data.lstStandlonData;

            this.dataSource =new MatTableDataSource<any>(data.data.lstConsolidData);
            this.dataSourcestd =new MatTableDataSource<any>(data.data.lstStandlonData);
            this.catdatasource=data.data.lstCategory;
            this.filterDictionary= new Map<string,string>();

            //this. displaycolumn1=['entityId','lTorST','ratingDate', 'ratingBy', 'amount', 'rating','instrument','ratingId'];
            this. displayedColumns= ['category', 'period', 'date', 'dashDPName','data'];
            console.log( this.dataSource);
            console.log(this.displayedColumns);
            this.cdr.detectChanges();
                      this.totalrecords=data.data.lstConsolidData.length;
                      this.dataSource.paginator=this.paginator;
                      this.dataSourcestd.paginator=this.paginator1;
                      //this.displaycolumns=data.data.Lstcols;

                     // this.lstcols==data.data.Lstcols;
                     // this.displaycolumns=this.lstcols.map((p: { key: any; })=>p.key);
            //console.log("Data rating",this.dataSource.data)

            this.dataSource.filterPredicate = function (record,filter) {
              //debugger;
              var map = new Map(JSON.parse(filter));
              let isMatch = false;
              for(let [key,value] of map){
                isMatch = (key==0) || (record['categoryId'] == key); 
                if(!isMatch) return false;
              }
              return isMatch;
            }
            
          
          }
          data.console.error();
          
        }});
        this.count=0;
      }

    throw new Error('Method not implemented.');
  }
  

  /*OnSelectChange(categrydata: MatSelectChange) {
   /*if(categrydata.categoryId===0)
   {
    this.dataSource =new MatTableDataSource<any>(this.catApiresponse);
   }
   else{*/
    /*this.filterDictionary.set(categrydata.value);


    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    
    //this.dataSource=this.catApiresponse;
    this.dataSource.filter = jsonString;
    
   //}
    throw new Error('Method not implemented.');
    }*/

    OnSelectChange($event:any)
    {
      const el= <HTMLElement>document.getElementById('consolidated');
     let tab= el.tabIndex;
     let a=el.className;
      if($event.value>0)
      {
        if( this.tabIndex==0)
        {
      let filterdata=_.filter(this.catApiresponse,(item)=>{
        return item.categoryId==$event.value;
      })
      this.dataSource=new MatTableDataSource(filterdata);
      this.totalrecords=filterdata.length;
      this.dataSource.paginator=this.paginator;
    }
    else{
      let filterdata=_.filter(this.stdApiresponse,(item)=>{
        return item.categoryId==$event.value;
      })
      this.dataSourcestd=new MatTableDataSource(filterdata);
      //this.totalrecords=filterdata.length;
      this.dataSourcestd.paginator=this.paginator1;
    }
    }
    else{
      if( this.tabIndex==0)
        {
      this.dataSource=new MatTableDataSource(this.catApiresponse);
      this.totalrecords=this.dataSource.data.length;
      this.dataSource.paginator=this.paginator;
        }
        else{
          this.dataSourcestd=new MatTableDataSource(this.stdApiresponse);
      this.totalrecords=this.dataSource.data.length;
      this.dataSourcestd.paginator=this.paginator1;
        }
    }
      
    }
   
    selectedIndex = 0;

  _selectedTabChange(index: number) {
    console.log("_selectTabChange " + index);
    this.tabIndex=index;
  }

  _selectedIndexChange(index: number) {
    console.log("_selectedIndexChange " + index);
    this.tabIndex=index;
  }

  _select(index: number) {
    console.log("_select " + index);
    // if (this.mattabgroup) { this.mattabgroup.selectedIndex = index;  }
    this.selectedIndex = index;
    this.tabIndex=index;
  }
  tabchange(tabindex: number) {
    console.log("_select " + name);
    if(tabindex==0)
    {
      this.tabIndex=0;
    }
   else{
    this.tabIndex=1;
   }
   this._selectedIndexChange( this.tabIndex);
   this._selectedTabChange( this.tabIndex); 
    // if (this.mattabgroup) { this.mattabgroup.selectedIndex = index;  }
    //this.selectedIndex = name;
    //this.tabIndex=name;
  }
}
