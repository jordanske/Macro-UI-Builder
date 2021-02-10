import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MacroUiBuilderComponent } from './macro-ui-builder/macro-ui-builder.component';

const routes: Routes = [
    {
        path: '',
        component: MacroUiBuilderComponent,
        // loadChildren: () => import('@macro-ui-builder/macro-ui-builder.module').then(m => m.LoginPageModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
