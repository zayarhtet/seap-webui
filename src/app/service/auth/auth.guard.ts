import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { pathBeforeLogin } from '../../app-routing.module';

export const TutorAuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)
    if (!authService.isTutor()) {
        router.createUrlTree(['not-found'])
    }
    return true;
};

export const AuthGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if (!await authService.isLoggedIn()) {
        return router.createUrlTree(['/login'])
    }
    return true;
};

export const AfterLoggedinGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if (await authService.isLoggedIn() && route.url.find(x => Object.values(pathBeforeLogin).includes(x.path)) != null ) {
        return router.createUrlTree(['/main'])
    }
    return true;
};

export const TuteeAuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if (!authService.isTutee()) {
        return router.createUrlTree(['/not-found'])
    }
    return true;
};
