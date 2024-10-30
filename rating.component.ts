import { ChangeDetectorRef, Component, Input, input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InvitDetailsService } from '../../service/invit-details.service';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent implements OnChanges{
  totalrecords=0;
  //displaycolumns:any;
  
  displaycolumn1:string[]=[];
  lstcols:any;
  @Input() public myFormval!: FormGroup; 
  @Input()  count: any;
  dataSource = new MatTableDataSource<any>();
  constructor(private router: Router,private service:InvitDetailsService, private cdr: ChangeDetectorRef)
  {
    this.displaycolumn1=[];
  }
  ngOnChanges(changes: SimpleChanges): void {

    if(this.count>=1){
      this.service.GetRatingData(this.myFormval).subscribe({
        next: (data: any) => {
          if(data.success){
            debugger;

            this.dataSource =new MatTableDataSource<any>(data.data.lstRating);
            //this. displaycolumn1=['entityId','lTorST','ratingDate', 'ratingBy', 'amount', 'rating','instrument','ratingId'];
            this. displaycolumn1=['ratingDate', 'ratingBy', 'amount', 'rating','instrument'];
            console.log( this.dataSource);
            console.log(this.displaycolumn1);
            this.cdr.detectChanges();
                      this.totalrecords=data.data.lstRating.length;
                      this.dataSource.paginator=this.paginator;
                      //this.displaycolumns=data.data.Lstcols;

                      this.lstcols==data.data.Lstcols;
                     // this.displaycolumns=this.lstcols.map((p: { key: any; })=>p.key);
            //console.log("Data rating",this.dataSource.data)
          
          }
          data.console.error();
          
        }});
        this.count=0;
      }

    throw new Error('Method not implemented.');
  }
  @ViewChild(MatPaginator)  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
