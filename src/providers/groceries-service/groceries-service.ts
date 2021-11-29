import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators'
import { Subject } from 'rxjs';

/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log('Hello GroceriesServiceProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    const apiUrl = `${this.baseURL}/api/groceries`;
    return this.http.get(apiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  removeItem(id){
    const apiUrl = `${this.baseURL}/api/groceries/${id}`;
    this.http.delete(apiUrl).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })

  }

  addItem(item){
    const apiUrl = `${this.baseURL}/api/groceries`;
    this.http.post(apiUrl, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })
  }

  editItem(item){
    const apiUrl = `${this.baseURL}/api/groceries/${item._id}`;
    this.http.put(apiUrl, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })
  }
}