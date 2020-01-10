import { BadDebtComponent } from './../container/installment/bad-debt/bad-debt.component';
import { InterestPaymentHistoryComponent } from './../container/installment/interest-payment-history/interest-payment-history.component';
import { BdsComponent } from './../container/bds/bds.component';
import { AssetComponent } from './../container/asset/asset.component';
import { ProfileComponent } from './../container/profile/profile.component';
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
import { CapitalContributionComponent } from '../container/installment/capital-contribution/capital-contribution.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'manager', component: MainComponent,canActivate: [CanActivateService], data: {role: 'Admin'},  children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'installment', component: InstallmentComponent, children: [
                {path: '', redirectTo: 'itm-list', pathMatch: 'full'},
                {path: 'itm-list', component: ItmListComponent},
                {path: 'pay-interest-history', component: InterestPaymentHistoryComponent},
                {path: 'bad-debt', component: BadDebtComponent},
                {path: 'capital-contribution', component: CapitalContributionComponent},
            ] },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'user', component: UserComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'assets', component: AssetComponent },
            { path: 'bds', component: BdsComponent },
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
