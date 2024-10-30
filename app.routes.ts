import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { InvitsComponent } from './invits/invits.component';
// import { SpvAnalyzerComponent } from './spv-analyzer/spv-analyzer.component';
import { SpvDashboardComponent } from './spv-dashboard/spv-dashboard.component';
import { MapchartComponent } from './mapchart/mapchart.component';
import{LogoutComponent} from'./user-management/logout/logout.component';
export const routes: Routes = [
    {path:'',loadChildren:()=> import('./user-management/user-mangement.routing').then(m=>m.usermngroutes)},
    {path:'logout',loadComponent:()=>LogoutComponent},
    // {path:'',loadChildren:()=> import('./layout/layout.routing').then(m=>m.layoutroutes)},
    {
        path:'home',loadComponent:()=>MainComponent,
        children:[
           {path:'',loadChildren:()=> import('./dashboard/dashboard.routing').then(m=>m.dashboardroutes)},
          ]
      },
      {
        path:'home',loadComponent:()=>MainComponent,
        children:[
           {path:'',loadChildren:()=> import('./invits/invits.routing').then(m=>m.invitsroutes)},
          ]
      },
      {
        path:'home',loadComponent:()=>MainComponent,
        children:[
           {path:'',loadChildren:()=> import('./performance-scanner/performace-scanner-routing').then(m=>m.Performaceroutes)},
          ]
      },
      {
        path:'spv',loadComponent:()=>MainComponent,
        children:[
           {path:'',loadChildren:()=> import('./spv-analyzer/spv-analyzer.routing').then(m=>m.SpvAnalyzerRouts)},
           {path:'',loadChildren:()=> import('./spv-dashboard/spv-dashboard.routing').then(m=>m.SpvDashboardRouts)},
          ]
      },
      {
        path:'map',loadComponent:()=>MapchartComponent
      },
      {
        path:'reits',loadComponent:()=>MainComponent,
        children:[
           {path:'',loadChildren:()=> import('./reits-valuation/reits-valuation.routing').then(m=>m.ReitsValuationRouts)},
          ]
      },

      // {
      //   path:'spv',loadComponent:()=>MainComponent,
      //   children:[
      //      {path:'',loadChildren:()=> import('./spv-dashboard/spv-dashboard.routing').then(m=>m.SpvDashboardRouts)},
      //     ]
      // },
];