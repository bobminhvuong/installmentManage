import { ItmListComponent } from './../container/installment/itm-list/itm-list.component';
import { PaymoneyComponent } from './../container/installment/paymoney/paymoney.component';
import { AddContractComponent } from './../container/installment/add-contract/add-contract.component';
import { UserComponent } from './../container/user/user.component';
import { InstallmentComponent } from './../container/installment/installment.component';
import { CustomerComponent } from './../container/customer/customer.component';
import { LoginComponent } from './../login/login.component';
import { CanActivateService } from './../service/auth/can-activate.service';
import { DashboardComponent } from './../container/dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../container/main/main.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'manager', component: MainComponent,  children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'installment', component: InstallmentComponent, children: [
                {path: '', redirectTo: 'itm-list', pathMatch: 'full'},
                {path: 'addcontract', component: AddContractComponent},
                {path: 'itm-list', component: ItmListComponent},
                {path: 'paymoney', component: PaymoneyComponent},
            ] },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'user', component: UserComponent },
        ]
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { useHash: true })
    ]
})
export class AppRoutingModule { }