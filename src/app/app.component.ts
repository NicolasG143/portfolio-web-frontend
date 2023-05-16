import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'portfolio-web-frontend';
  position = document?.querySelector("html");
  showScrollButton = false;
  @HostListener('window:scroll')
  onWindowScroll(){
    if (window.scrollY > 0){
      this.showScrollButton = true;
    }
    else{
      this.showScrollButton = false;
    }
  }

  scrollToTop(){
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

}
