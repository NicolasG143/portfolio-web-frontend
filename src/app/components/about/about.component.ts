import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  edad: number = this.calcularEdad();

  ngOnInit(): void{
  }

  calcularEdad(): number {
    let fecha = Date.now()
    let birth = Date.parse("01/20/2003")
    return Math.floor((fecha - birth)/31536000000) // ese numero es un AÑO en milisegundos.
  }

}
