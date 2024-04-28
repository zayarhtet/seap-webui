import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter, RouterLink, RouterOutlet } from '@angular/router';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthCardComponent } from './auth-card/auth-card.component';

import { FloatLabelModule } from 'primeng/floatlabel';
import { Button, ButtonModule } from 'primeng/button';
import { Card, CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './service/auth/auth.service';
import { MainComponent } from './main/main.component';
import { FamilyComponent } from './family/family.component';
import { DutyComponent } from './duty/duty.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleFamilyComponent } from './single-family/single-family.component';
import { SingleDutyComponent } from './single-duty/single-duty.component';
import { GradingDutyComponent } from './grading-duty/grading-duty.component';
import { NewGradingComponent } from './new-grading/new-grading.component';
import { TokenInterceptorService } from './service/auth/token-interceptor.service';
import { FamilyService } from './service/general/family.service';
import { CreateNewFamilyComponent } from './create-new-family/create-new-family.component';
import { CreateNewDutyComponent } from './create-new-duty/create-new-duty.component';
import { FamilyMemberComponent } from './family-member/family-member.component';
import { NewFamilyMemberComponent } from './new-family-member/new-family-member.component';
import { FamilyContainerComponent } from './family-container/family-container.component';
// import { DutyContainerComponent } from './duty-container/duty-container.component';
import { SingleFamilyContainerComponent } from './single-family-container/single-family-container.component';
import { EditDutyGradingComponent } from './edit-duty-grading/edit-duty-grading.component';
import { SingleDutyContainerComponent } from './single-duty-container/single-duty-container.component';
import { DatePipe } from '@angular/common';
// import { HttpErrorInterceptorService } from './service/general/http-error-interceptor.service';
// import { SingleDutyContainerComponent } from './single-duty-container/single-duty-container.component';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent,
        DashboardComponent,
        AuthCardComponent,
        PageNotFoundComponent,
        MainComponent,
        FamilyComponent,
        DutyComponent,
        ProfileComponent,
        SingleFamilyComponent,
        SingleDutyComponent,
        GradingDutyComponent,
        NewGradingComponent,
        CreateNewFamilyComponent,
        CreateNewDutyComponent,
        FamilyMemberComponent,
        NewFamilyMemberComponent,
        FamilyContainerComponent,
        // DutyContainerComponent,
        SingleFamilyContainerComponent,
        EditDutyGradingComponent,
        SingleDutyContainerComponent,
        // SingleDutyContainerComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterOutlet,
        RouterLink,
        FloatLabelModule,
        InputTextModule,
        DropdownModule,
    ],
    providers: [
        provideRouter(routes),
        AuthService,
        DatePipe,
        FamilyService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
