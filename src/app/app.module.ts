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

import { Button, ButtonModule } from 'primeng/button';
import { Card, CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent,
        DashboardComponent,
        AuthCardComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterOutlet,
        RouterLink,
        ButtonModule,
        CardModule,
        InputGroupModule,
        InputGroupAddonModule,
        FloatLabelModule,
        PasswordModule,
        InputTextModule,
    ],
    providers: [provideRouter(routes)],
    bootstrap: [AppComponent],
})
export class AppModule { }
