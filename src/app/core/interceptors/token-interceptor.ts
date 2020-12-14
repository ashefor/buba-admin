import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
// import { BidService } from 'src/app/makebid/services/bid.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private service: AuthService,
                private router: Router,
                private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // tslint:disable-next-line: no-string-literal
        const routePath = this.activatedRoute.snapshot['_routerState'].url;
        if (this.service.isLoggedIn()) {
            const token = this.service.getToken();
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            });
        }
        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                this.toastr.error(error.error.message, 'Unauthorised!');
                // this.router.navigate(['/login']);
                // this.service.clearSessionStorage().then(() => this.service.storeUser(null));
                return throwError(error);
            } else {
                return throwError(error);
            }
        }));
    }
}
