import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BASE_URL } from '../config';

@Injectable()
export class CustomHttpService {

    constructor(private httpClient: HttpClient) { }

    private getAccessToken() {

        return (localStorage.getItem('access_token') || '');

    }

    private addHeaders(optionalHeaders?: HttpHeaders) {

        let requestHeaders = new HttpHeaders()
            .set('Authorization', this.getAccessToken());
        // .set('Content-Type', 'application/json');
        if (optionalHeaders) {
            for (const header of optionalHeaders.keys()) {
                requestHeaders = requestHeaders.append(header, optionalHeaders.get(header));
            }
        }
        return requestHeaders;
    }



    get(url: string, options?: HttpHeaders) {

        let headers = this.addHeaders(options);

        return this.httpClient.get(BASE_URL + url, { headers: headers, observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
    }

    post(url: string, body: any, options?: HttpHeaders) {

        let headers = this.addHeaders(options);


        return this.httpClient.post(BASE_URL + url, body, { headers: headers, observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
    }

    put(url: string, body: any, options?: HttpHeaders) {

        let headers = this.addHeaders(options);


        return this.httpClient.put(BASE_URL + url, body, { headers: headers, observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(url: string, options?: HttpHeaders) {

        let headers = this.addHeaders(options);


        return this.httpClient.delete(BASE_URL + url, { headers: headers, observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
    }

    postForLogin(body: any) {

        return this.httpClient.post(BASE_URL + '/login', body, { observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: HttpResponse<any>) {

        // console.log('inside extract data', res);
        return res.body || res.status;
    }

    private handleError(err: HttpErrorResponse) {
        // console.log('inside handle error', err);
        let errorInfo: any = {};

        if (err.error instanceof Error || err.error instanceof ProgressEvent) {
            /**A client-side or network error occurred. Handle it accordingly.*/
            // console.log('An error occurred:', );
            errorInfo.status = err.status;
            errorInfo.status === 0 ? errorInfo.msg = "No Internet, Check Your connection Or Try again"
                : errorInfo.msg = err.message || 'Some Error Occured';
        } else {

            /**The backend returned an unsuccessful response code.*/
            // console.log('Server occurred:', err);
            errorInfo.status = err.status;
            errorInfo.msg = err.error.error || err.error.message || 'Internal Server Error';
        }
        return Observable.throw(errorInfo);

    }

}
