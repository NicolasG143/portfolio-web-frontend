import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
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
