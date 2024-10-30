import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
//import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
//import Highcharts, { Options } from "highcharts/highmaps";
import indiaMap from './indiaMap';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from "highcharts/highmaps";
import highmaps from 'highcharts/modules/map.src';
import more from 'highcharts/highcharts-more.src';

export declare class MapChart {
  options: any;
  ref: any;
  constructor(options: any);
}


@Component({
  selector: 'app-map',
  standalone: true,
imports:[HighchartsChartModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnChanges{

  @Input() public graphdata!: any; 
  @ViewChild('charts')  public chartEl!: ElementRef;
  @Input()  count: any;
  Lstdata:any;
  mapChart!: MapChart;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  //chartOptions!: Options;
  chartOptions:any;
  constructor()
  {
    this.Lstdata=[];
  }

  ngOnChanges(changes: SimpleChanges): void {
  
    if(this.count>=1){
      this.Lstdata=this.graphdata.lstMap;
  }
    throw new Error('Method not implemented.');
  
    this.Highcharts = Highcharts;
    const caMapData = require("@highcharts/map-collection/countries/ca/ca-all.geo.json");
    const caMap = Highcharts.geojson(caMapData);

// Set a random value on map
caMap.forEach((el: any, i) => {
  el.value = i;
  el.drilldown = el.properties["hc-key"];
});

this.chartOptions = {
  chart: {
    height: (8 / 16) * 100 + "%",
    events: {
     
    }
  },
  title: {
    text: ""
  },
  colorAxis: {
    min: 0,
    minColor: "#E6E7E8",
    maxColor: "#417BCC"
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom"
    }
  },
  plotOptions: {
    map: {
      states: {
        hover: {
          color: "#F8BA03"
        }
      }
    }
  },
  series: [
    {
      name: "Canada",
      data: caMap
    }
  ],
  drilldown: {}
};

  }
}



