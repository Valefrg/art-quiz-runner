import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ConnectionService {
    public isOnlineMode: boolean = environment.defaultConnectionIsOnline;
    connectEvent: Observable<boolean>;
    private _connectEvent = new Subject<boolean>();

    public constructor() {
        this.connectEvent = this._connectEvent.asObservable();
        this._connectEvent.next(this.isOnlineMode);
    }

    public switchConnectionMode() {
        this.isOnlineMode = !this.isOnlineMode;
        this._connectEvent.next(this.isOnlineMode)
    }

}