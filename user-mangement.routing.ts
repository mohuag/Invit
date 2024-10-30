import { Routes } from '@angular/router';
export const usermngroutes: Routes = [

{path:'',loadComponent:()=>import('./login/login.component').then(x=>x.LoginComponent)},
{path:'login',loadComponent:()=>import('./login/login.component').then(x=>x.LoginComponent)},
];