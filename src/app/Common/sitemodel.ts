export module SiteModel{

    export class RemoteResult<T> {
        data: T;
        exception: RemoteException;
        constructor(object: any){
            this.data = object.data;
            this.exception = new RemoteException(object.exception);
        }
    }

    export class RemoteException {
        message : string;
        stackTrace: string;
        constructor(object: any){
            this.message = object.message;
            this.stackTrace = object.stackTrace;
        }
    }

    export class UserProfile {
        userId : number;
        userName : string; 
        mobile : number;
        password : string;
        address : string;
        lastLoggedIn : Date;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
        token : number; 
    }
}