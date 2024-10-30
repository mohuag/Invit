import { Routes } from '@angular/router';
export const invitsroutes: Routes = [

{path:'invits',loadComponent:()=>import('./invits.component').then(x=>x.InvitsComponent)},

];