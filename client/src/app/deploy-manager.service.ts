import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

declare const EventSource: any;

@Injectable()
export class DeployManagerService {

  private url = 'http://localhost:8181';

  public undeployEvents: Observable<string>;

  constructor(private http: Http) {

    this.undeployEvents = Observable.create(observer => {
      const eventSource = new EventSource(this.url + '/sse-stream');
      //eventSource.onmessage = x => observer.error(x); no type
      eventSource.onerror = x => observer.error(x);//todo reconnect?
      eventSource.addEventListener('undeploy', x => observer.next(x.data));
      return () => eventSource.close();
    });
  }

  public getApps(): Observable<Array<Application>> {
    return this.http.get(this.url + `/apps`)
      .map(res => res.json());
  }

  public getTomcatHost(): Observable<string> {
    return this.http.get(this.url + '/config')
      .map(res => res.json().tomcatHost);
  }

  public undeploy(path: string): Observable<boolean> {
    return this.http.delete(this.url + '/undeploy?path=' + path + '&dryRun=true')
      .map(res => res.json().success);
  }
}

export class Application {
  contextPath: string;
  running: boolean;
  docBase: string;
  sessions: number;
  readonly: boolean;
}
