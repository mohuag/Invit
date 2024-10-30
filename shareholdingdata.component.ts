
import {NestedTreeControl} from '@angular/cdk/tree';
import {Component,Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { InvitDetailsService } from '../../service/invit-details.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilServiceService } from '../../service/util-service.service';
import { ShareholdingGraphComponent } from "../shareholding-graph/shareholding-graph.component";

export interface ShareHoldingNode {
  shareHoldingName: string;
  shareHoldingData: number;
  children?: ShareHoldingNode[];
}

@Component({
  selector: 'app-shareholdingdata',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, ShareholdingGraphComponent],
  templateUrl: './shareholdingdata.component.html',
  styleUrl: './shareholdingdata.component.css'
})
export class ShareholdingdataComponent implements OnChanges{
  treeControl = new NestedTreeControl<ShareHoldingNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ShareHoldingNode>();
  graphdata:any;
  activeNodeName: string[] = ['Total Indian Promoter & Group','Total Non Promoter - Non Institution'];
  @Input() public myFormval!: FormGroup; 
  @Input()  count: any;
  constructor(private router: Router,private service:InvitDetailsService) {
    
  }
  ngOnChanges() {
    debugger;
    
    // if(!UtilServiceService.isUndefinedOrNullOrEmpty(this.myFormval))
    //   {

    if(this.count>=1){
      this.service?.PostShareHoldingData(this.myFormval).subscribe({
        next: (data: any) => {
          if(data.success){
            debugger;
            this.graphdata=data.data;
            this.dataSource.data = data.data.lstShareholding;
            this.treeControl.dataNodes = this.dataSource.data;
            console.log("Data Shareholding",this.dataSource.data)
            const data2 = this.treeControl.dataNodes;
            for(var itm of this.activeNodeName)
            {
            this.exp(data2, itm);
            }
          }
          data.console.error();
          
        }});
        this.count=0;
      }
       //}
  }
  exp(data: ShareHoldingNode[], name: string): any {
    data.forEach(node => {
      if (node.children && node.children.find(c => c.shareHoldingName === name)) {
        this.treeControl.expand(node);
        this.exp(this.treeControl.dataNodes, node.shareHoldingName);
      } 
      else if (node.children && node.children.find(c => c.children)) {
        this.exp(node.children, name);
      }    
    });
  }
  hasChild = (_: number, node: ShareHoldingNode) => !!node.children && node.children.length >= 0;
}
