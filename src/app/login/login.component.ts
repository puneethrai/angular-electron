import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Jira } from '../shared/services/jira.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private jira: Jira) {
    this.buildLoginForm();
  }

  ngOnInit() {

  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      hostname: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  validationMessages = {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'validUsername', message: 'username is invalid' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'password', message: 'password is invalid' }
    ],
    hostname: [
      { type: 'required', message: 'HostName is required' },
      { type: 'hostname', message: 'hostName is invalid' }
    ]
  };

  async onSubmitLoginForm() {

    try {
      if (this.loginForm.valid) {

        const name = this.loginForm.get('username');
        const password = this.loginForm.get('password');
        const hostname = this.loginForm.get('hostname');

        await this.jira.onLogin({
          protocol: 'https',
          host: hostname.value,
          username: name.value,
          password: password.value,
          strictSSL: true,
          apiVersion: 'latest',
          base: 'jira'
        })
      }


    }
    catch (exception) {
      console.error(exception);
      //const message = JSON.parse(exception.error);
      //alert(message.message);
    }

  }

}
