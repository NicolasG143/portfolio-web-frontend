import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

  constructor(private fb: FormBuilder){}

  get name(){
    return this.contactForm.get('name') as FormControl
  }

  get email(){
    return this.contactForm.get('email') as FormControl
  }

  get message(){
    return this.contactForm.get('message') as FormControl
  }

  maxLength: number = 180

  contactForm = this.fb.group({
    'name': ['', Validators.required],
    'email': ['', [Validators.required, Validators.email]],
    'message': ['', [Validators.required, Validators.minLength(20), Validators.maxLength(this.maxLength)]]
  })

  enviarMensaje(){
    this.contactForm.reset()
  }
}
