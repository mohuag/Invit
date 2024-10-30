import { Component, OnInit, ElementRef, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import Highcharts, { color } from 'highcharts';
import { CommonModule, formatDate } from '@angular/common';


//import { shareholdinggraph } from '../../models/performancemodel';

export class shareholdinggraph{
  public name:any;
  public data:any=[];
  public color:any;
}
@Component({
  selector: 'app-shareholding-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shareholding-graph.component.html',
  styleUrl: './shareholding-graph.component.css'
})
export class ShareholdingGraphComponent implements OnChanges{
alldata:any;
quterdata:any;
Lstgraphdata:any;
quaters:any;
datemdY:string = '';

colorlist:string[]=['#6576ff', '#ffa353', '#20c997','#ff63a5','#1676fb','#09c2de', '#ffa9ce', '#f9db7b'];
  @Input() public graphdata!: any; 
  
  @Input()  count: any;
  @ViewChild('charts')  public chartEl!: ElementRef;
  chartoptions!: any;
  datapoints!: shareholdinggraph[];
  names:any;
  dp:any;
  
constructor()
{
  this.Lstgraphdata=[];
  this.quterdata=[];
  this.quaters=[]
  this.datapoints=[];
  this.names=[];
  this.dp=[];
}
  ngOnChanges(changes: SimpleChanges): void {
    this.Lstgraphdata=[];
    this.quterdata=[];
    this.quaters=[]
    this.datapoints=[];
    this.names=[];
    this.dp=[];
    this.chartoptions=[];
  
    if(this.graphdata.lstgraphdata.length>0)
    {
      this.alldata=this.graphdata.lstShareholding;
      this.Lstgraphdata=this.graphdata.lstgraphdata;

     this.quterdata=this.graphdata.lstQuater;
var firstdata=this.Lstgraphdata[0];
     for (var nam of firstdata)
      {

         this.names.push(nam.shareHoldingName);
      }
     for (var val of this.quterdata)
     {
          
        this.quaters.push(val);
     }
     let x=0;
     for (var name of this.names)
      {
        this.dp=[];
        for (var q of this.quterdata)
          {
            for (var dt of this.Lstgraphdata)
              {
                //for (var item of dt)
                 // {
                    let sharetObj =  dt.filter((t: { shareHoldingName: any; quater: any; })=>t.shareHoldingName ===name && t.quater===q)[0];
                    if(sharetObj!==undefined)
                    {
                    this.dp.push(sharetObj.shareHoldingData);
                    }
                  //}
              }
          }
if(x>5)
{
  x=0;
}
          this.datapoints.push({
            name: name,
            data:this.dp ,
            color:this.colorlist[x]
           
          });
          x++;
      }

     
     this.chartoptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
       // categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      categories:this.quaters
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Shareholding pattern (graph view)'
        },

      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
     /* series: [{
        name: 'John',
        data: [5, 3, 4, 7, 2]
      }, {
        name: 'Jane',
        data: [2, 2, 3, 2, 1]
      }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5]
      }]*/
        series:this.datapoints,
        credits: {
          enabled: false
        },
    };
 Highcharts.chart(this.chartEl.nativeElement, this.chartoptions);
   
      // this.count=0;
      //}

  }
  else{
   // this.chartoptions.series[0] = {
     // type: "line",
     // data: []
   // };
   this.chartoptions = {
    title:{
      text:''
  },
    series:[],
        credits: {
          enabled: false
        },
   };
   Highcharts.chart(this.chartEl.nativeElement, this.chartoptions);
    //if(this.count>=1){
  }
    throw new Error('Method not implemented.');
  }

}
