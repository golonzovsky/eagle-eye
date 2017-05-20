import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {DeployManagerService} from "./deploy-manager.service";

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-8">
          <h1>tomcat application list</h1>
          <p class="lead">Tomcat manager exposed in browser for use and abuse</p>

          <table class="table">
            <thead>
            <tr>
              <th>Context Path</th>
              <th>Status</th>
              <th>Sessions</th>
              <th>DocBase</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let app of apps">
              <th><a [href]="tomcatHost + app.contextPath">{{app.contextPath}}</a></th>
              <td>{{app.running}}</td>
              <td>{{app.sessions}}</td>
              <td>{{app.docBase}}</td>
              <td><i class="fa fa-times text-center" aria-hidden="true"></i></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="col-4"><img src="/assets/jerry.jpg" width="150px"></div>
      </div>

    </div>
  `,
  styles: [`
    div.container, .table {
      margin-top: 50px;
    }

    i.fa {
      margin-left:20px;
    }

    i.fa:before {
      cursor: pointer;
    }
  `]
})
export class AppComponent implements OnInit {
  apps: Array<Application>;
  tomcatHost: string;

  constructor(private deployManagerService: DeployManagerService) {
  }

  ngOnInit(): void {
    this.deployManagerService.getApps().subscribe(apps => this.apps = apps);
    this.deployManagerService.getTomcatHost().subscribe(tomcatHost => this.tomcatHost = tomcatHost);
  }

}

export interface Application {
  contextPath: string
  running: boolean
  docBase: string
  sessions: number
  readOnly: boolean
}

export interface Config {
  tomcatHost: string
}
