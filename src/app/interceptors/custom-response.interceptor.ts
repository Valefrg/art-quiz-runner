import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CustomResponseInterceptor implements HttpInterceptor {

    private curJWT : string = ''

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({ 
            headers: req.headers.set('GameState', this.curJWT),
        });
        return next.handle(modifiedReq).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                let gameStateHeaderValue = event.headers.get('GameState');
                if (gameStateHeaderValue) {
                    this.curJWT = gameStateHeaderValue;
                    localStorage.setItem('curJWT', this.curJWT);
                }
            }   
            return event;
        }));

    }

    private modifyBody(body: any) {
        /*
        * write your logic to modify the body
        * */
    }
}