import {Component, OnInit} from "@angular/core";
import {Application, DeployManagerService} from "../deploy-manager.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-list',
  template: `
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
          <undeploy-action [app]="app" (undeployEvent)="undeploy($event)"></undeploy-action>
        </td>
      </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .table {
      margin-top: 50px;
    }
  `],
  animations: [
    trigger(
      'delete', [
        transition(':leave', animate(200, style({transform: 'translateY(100%)', opacity: 0})))
      ]
    )]
})
export class AppListComponent implements OnInit {

  apps: Array<Application>;
  tomcatHost: string;

  constructor(private deployManagerService: DeployManagerService) {
  }

  ngOnInit(): void {
    this.deployManagerService.getApps().subscribe(apps => this.apps = apps);
    this.deployManagerService.getTomcatHost().subscribe(tomcatHost => this.tomcatHost = tomcatHost);
  }

  private undeploy(app: Application) {
    this.apps = this.apps.filter(item => item !== app);
  }

}
