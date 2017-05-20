import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";

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
              <th>{{app.contextPath}}</th>
              <td>{{app.running}}</td>
              <td>{{app.sessions}}</td>
              <td>{{app.docBase}}</td>
              <td><span class="glyphicon glyphicon-search" aria-hidden="true"></span></td>
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

    .img {
      position: sticky;
      top: 0;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'app works!';
  apps: Array<Application>;

  constructor(private http: Http) {
  }

  ngOnInit(): void {
    this.apps = [
      {
        "contextPath": "/manager",
        "running": true,
        "docBase": "test",
        "sessions": 0,
        "readOnly": true
      },
      {
        "contextPath": "/test",
        "running": true,
        "docBase": "test",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/asdasdasd",
        "running": true,
        "docBase": "asdasdasd",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      },
      {
        "contextPath": "/notRunning",
        "running": false,
        "docBase": "notRunning",
        "sessions": 0,
        "readOnly": false
      }
    ];
  }

}

export interface Application {
  contextPath: string
  running: boolean
  docBase: string
  sessions: number
  readOnly: boolean
}
