import { Subject } from "rxjs";

const source$ = new Subject();

const toastHandler = ( message, description, type) => {
    source$.next( { message, description, type } );
}

export class Toast {
    constructor() {
        this.key = `open${Date.now()}`;
    }
    loading( description ) {
        this._toastHandler("Loading", description, "info");
    }
    success( description ) {
        this._toastHandler("Success", description, "success");
    }
    error( error ) {
        const desc = error?.response?.data?.message || error?.message || error;
        this._toastHandler("Error", desc, "error");
    }
    _toastHandler( message, description, type ) {
        source$.next( { message, description, type, key: this.key } );
    }
}

export const openToast = ( { message, description } ) => {
    source$.next( { message, description } );
}

export const toast = source$.asObservable();