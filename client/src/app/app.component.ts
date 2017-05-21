import {Component} from "@angular/core";

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
          <app-list></app-list>
        </div>
        
        <div class='col-sm-4 hidden-xs-down'><img src='/assets/jerry.jpg' width='150px'></div>
        
      </div>
    </div>
  `,
  styles: [`

    @media (min-width: 576px) {
      div.container {
        margin-top: 50px;
      }
    }

    img {
      margin-top: 40px;
    }
  `]
})
export class AppComponent {

}

