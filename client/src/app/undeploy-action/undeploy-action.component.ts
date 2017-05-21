import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Application, DeployManagerService} from "../deploy-manager.service";

@Component({
  selector: 'undeploy-action',
  template: `
    <div *ngIf="!this.app.readOnly; else disabled">
      <i class='fa fa-times text-center' (click)='undeploy()'></i>
    </div>
    <ng-template #disabled>
      <i #disabled class='fa fa-times text-center disabled'></i>
    </ng-template>
    
    <div class="sk-wave">
      <div class="sk-rect sk-rect1"></div>
      <div class="sk-rect sk-rect2"></div>
      <div class="sk-rect sk-rect3"></div>
      <div class="sk-rect sk-rect4"></div>
      <div class="sk-rect sk-rect5"></div>
    </div>`,
  styles: [`
    div.sk-wave {
      margin: 0;
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

  @Input()
  app: Application;

  @Output()
  undeployEvent = new EventEmitter<Application>();

  constructor(private deployManagerService: DeployManagerService) {
  }

  private undeploy() {
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
