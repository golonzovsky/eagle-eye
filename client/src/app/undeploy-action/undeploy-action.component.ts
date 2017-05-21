import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Application, DeployManagerService} from "../deploy-manager.service";

@Component({
  selector: 'undeploy-action',
  template: `
    <i *ngIf="!inProgress" class='fa fa-times text-center' [class.disabled]="app.readOnly" (click)='undeploy()'></i>

    <div *ngIf="inProgress" class="sk-wave">
      <div class="sk-rect sk-rect1"></div>
      <div class="sk-rect sk-rect2"></div>
      <div class="sk-rect sk-rect3"></div>
      <div class="sk-rect sk-rect4"></div>
      <div class="sk-rect sk-rect5"></div>
    </div>
  `,
  styles: [`
    div.sk-wave {
      margin: -10px 8px;
    }

    i.fa {
      margin-left: 20px;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    i.disabled {
      color: gray;
      cursor: not-allowed;
    }
  `]
})
export class UndeployActionComponent {

  inProgress = false;

  @Input() app: Application;
  @Output() undeployEvent = new EventEmitter<Application>();

  constructor(private deployManagerService: DeployManagerService) {
  }

  private undeploy() {
    this.inProgress = true;
    this.deployManagerService.undeploy(this.app.contextPath)
      .subscribe(isSuccess => {
          if (isSuccess) {
            this.undeployEvent.emit(this.app);
          } else {
            console.log('cannot delete.. must be stronger!!');
          }
        }
      );
  }
}
