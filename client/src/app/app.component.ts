import {Component, OnInit} from '@angular/core';
import {DeployManagerService} from './deploy-manager.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  template: `
    <div class='container'>
      <div class='row '>
        <div class='col-12'>
          <h1 class='hidden-xs-down'>tomcat application list</h1>
          <h3 class='hidden-sm-up'>tomcat application list</h3>
          <p class='lead'>Tomcat manager exposed in browser for use and abuse</p>
        </div>

        <div class='col-12 col-sm-8'>
          <table class='table'>
            <thead>
            <tr>
              <th>Context Path</th>
              <th class='hidden-xs-down'>Status</th>
              <th class='hidden-xs-down'>Sessions</th>
              <th class='hidden-xs-down'>DocBase</th>
              <th class='hidden-xs-down'>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor='let app of apps' [@delete]>
              <th><a [href]='tomcatHost + app.contextPath'>{{app.contextPath}}</a></th>
              <td class='hidden-xs-down'>{{app.running}}</td>
              <td class='hidden-xs-down'>{{app.sessions}}</td>
              <td class='hidden-xs-down'>{{app.docBase}}</td>
              <td class='hidden-xs-down'>
                <i class='fa fa-times text-center' aria-hidden='true' (click)='undeploy(app)'></i>
                <app-spinkit-wave></app-spinkit-wave>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class='col-sm-4 hidden-xs-down'><img src=''/assets/jerry.jpg' width='150px'></div>
      </div>

    </div>
  `,
  styles: [`

    @media (min-width: 576px) {
      div.container, .table {
        margin-top: 50px;
      }
    }

    i.fa {
      margin-left: 20px;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    img {
      margin-top: 40px;
    }
  `],
  animations: [
    trigger(
      'delete', [
        transition(':leave', animate(200, style({transform: 'translateY(100%)', opacity: 0})))
      ]
    )],
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

  private undeploy(app: Application) {
    if (app.readOnly) {
      return;
    }
    this.deployManagerService.undeploy(app.contextPath).subscribe(
      isSuccess => {
        if (isSuccess) {
          this.apps = this.apps.filter(item => item !== app);
        } else {
          console.log('cannot delete.. must be stronger!!');
        }
      }
    );
  }

}

export interface Application {
  contextPath: string;
  running: boolean;
  docBase: string;
  sessions: number;
  readOnly: boolean;
}

export interface Config {
  tomcatHost: string;
}
