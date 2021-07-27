import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor
{
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        const token = localStorage.getItem("jwt");
        const authenticationRequest = req.clone(
            {
                headers: req.headers.set("Authorization", "Bearer " + token)
            }
        );

        return next.handle(authenticationRequest);
    }
}