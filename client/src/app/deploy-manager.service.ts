import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class DeployManagerService {

  constructor(private http: Http) {
  }

  public getApps(): Observable<Array<Application>> {
    return this.http.get('http://localhost:8181/apps')
      .map(res => res.json());
  }

  public getTomcatHost(): Observable<string> {
    return this.http.get('http://localhost:8181/config')
      .map(res => res.json().tomcatHost);
  }

  public undeploy(path: string): Observable<boolean> {
    return this.http.delete('http://localhost:8181/undeploy?path=' + path)
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
