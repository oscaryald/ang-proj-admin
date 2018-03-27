import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {SystemComponent} from "./system.component";
import {BillPageComponent} from "./bill-page/bill-page.component";
import {HistoryPageComponent} from "./history-page/history-page.component";
import {HistoryDetailComponent} from "./history-page/history-detail/history-detail.component";
import {PlaningPageComponent} from "./planing-page/planing-page.component";
import {RecordsPageComponent} from "./records-page/records-page.component";
import {AuthGuard} from '../shared/service/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: SystemComponent,
        canActivate:[AuthGuard],
        children: [
            {
                path:'bill',
                component: BillPageComponent
            },
            {
                path:'history',
                component: HistoryPageComponent
            },
            {
                path:'history/:id',
                component: HistoryDetailComponent
            },
            {
                path:'planing',
                component: PlaningPageComponent
            },
            {
                path:'records',
                component: RecordsPageComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemRoutingModule{}