import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { message } from "../pages/message_model";

@Injectable()
export class ServerService {

    constructor(private http: Http) { }
   

   //baseURL =  '/ionic';
    baseURL = 'http://192.168.0.11:80/ionic';
    headers = new Headers({ 'Content-Type': 'application/json' });

    /**UserInfo Service */
    userInfoService() {

        let userData = JSON.stringify(
            {
                username: "raja"
            });

        return this.http.post(this.baseURL + '/user.php',
            userData,
            { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    postMessageService(message) {

        let userData = JSON.stringify(
            {
                id: message.id,
                title: message.title,
                text: message.text
            });

        return this.http.post(this.baseURL + '/message.php',
            userData,
            { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        // let body = res.json();
        // let data = body;
        // return data;        

        console.log("test  1 "+res.json());
        res => res.json()
        console.log("test  2 "+res);
        return res;
    }

    getListOfNotificationMessage(): Observable<message[]> {
        return this.http.get(this.baseURL+'/userMessageList.php')
		   		.map(this.extractDoctorObjectData)
		        .catch(this.handleError);

    }

    getNotificationMessage(): Observable<message[]> {
        return this.http.get(this.baseURL+'/sendnotification.php')
		   		.map(this.extractDoctorObjectData)
		        .catch(this.handleError);

    }

    private extractDoctorObjectData(res: Response) {
	    let body = res.json();        
        return body;     
    }

    private handleError(error: Response | any) {
        console.error(error.message || error);
        console.error("Error Type"+error.type);
        console.error("Error Status"+error.status);
        console.error("body content for error"+error._body);
        return Observable.throw(error.status);
    }


}
