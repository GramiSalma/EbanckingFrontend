import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin!: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    })
  }

  handleLogin() {
    let username=this.formLogin.value.username;
    let password=this.formLogin.value.password;
    this.authService.login(username,password).subscribe({
      next: data=>{

        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin");
      },
      error:err=>{
        console.log(err)
      }


    })
  }
}
