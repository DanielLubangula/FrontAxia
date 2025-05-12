import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-parameter',
  imports: [ReactiveFormsModule],
  templateUrl: './parameter.component.html',
  styleUrl: './parameter.component.css'
})
export class ParameterComponent {
  infoForm = new FormGroup({
    name : new FormControl(''),
    email : new FormControl('')
  })

  updateInfo(){

  }

  passwordForm = new FormGroup({
    currentPassword : new FormControl(''),
    newPassword : new FormControl('')
  })

  changePassword(){

  }

  suppAccount(){
    
  }

}
