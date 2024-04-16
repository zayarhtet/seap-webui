import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AfterLoggedinGuard, AuthGuard } from './service/auth/auth.guard';
import { MainComponent } from './main/main.component';
import { FamilyComponent } from './family/family.component';
import { DutyComponent } from './duty/duty.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleFamilyComponent } from './single-family/single-family.component';
import { SingleDutyComponent } from './single-duty/single-duty.component';

export const pathBeforeLogin = {
    login: 'login',
    signup: 'signup'
}

export const routes: Routes = [
  {
    path: "",
    redirectTo: pathBeforeLogin.login,
    pathMatch: "full"
  },
  {
    path: pathBeforeLogin.signup,
    component: SignupComponent,
    canActivate: [AfterLoggedinGuard]

  },
  {
    path: pathBeforeLogin.login,
    component: LoginComponent,
    canActivate: [AfterLoggedinGuard]
  },
  {
    path: "main",
    component: MainComponent,
    children: [
        {
            path: '',
            component: DashboardComponent
        },
        {
            path: 'family',
            component: FamilyComponent,
        },
        {
            path: 'family/:famId',
            component: SingleFamilyComponent,
        },
        {
            path: 'family/:famId/duty/:dutyId',
            component: SingleDutyComponent,
        },
        {
            path: 'duty',
            component: DutyComponent
        },
        {
            path: 'profile',
            component: ProfileComponent
        },
        {
            path: '**',
            component: PageNotFoundComponent
        }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
