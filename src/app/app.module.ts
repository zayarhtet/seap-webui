import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, RouterLink, RouterOutlet } from '@angular/router';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthCardComponent } from './auth-card/auth-card.component';

import { FloatLabelModule } from 'primeng/floatlabel';
import { FileUploadModule } from 'primeng/fileupload';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './service/auth/auth.service';
import { MainComponent } from './main/main.component';
import { FamilyComponent } from './family/family.component';
import { DutyComponent } from './duty/duty.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleFamilyComponent } from './single-family/single-family.component';
import { SingleDutyComponent } from './single-duty/single-duty.component';
import { GradingDutyComponent } from './grading-duty/grading-duty.component';

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
        GradingDutyComponent
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
        FileUploadModule
    ],
    providers: [provideRouter(routes), AuthService],
    bootstrap: [AppComponent],
})
export class AppModule { }
