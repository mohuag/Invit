import { Routes } from '@angular/router';
export const dashboardroutes: Routes = [

{path:'dashboard',loadComponent:()=>import('./dashboard.component').then(x=>x.DashboardComponent)},
];