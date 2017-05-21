import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {DeployManagerService} from "./deploy-manager.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UndeployActionComponent} from "./undeploy-action/undeploy-action.component";
import {AppListComponent} from "./app-list/app-list.component";

@NgModule({
  declarations: [
    AppComponent,
    UndeployActionComponent,
    AppListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [DeployManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
