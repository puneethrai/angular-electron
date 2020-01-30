import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Jira } from '../shared/services/jira.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private jira: Jira) { }

  ngOnInit() {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      hostName: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  async onSubmitLoginForm(control: AbstractControl) {

    try {
      if (this.loginForm.valid) {
        const name = control.get('username').value;
        const password = control.get('password').value;
        const hostName = control.get('hostName').value;

        await this.jira.onLogin({
          protocol: 'https',
          host: 'hostName',
          username: 'name',
          password: 'password',
          strictSSL: true,
          apiVersion: 'latest',
          base: 'jira'
        })
      }


    }
    catch (exception) {
      console.error(exception);
      const message = JSON.parse(exception.error);
      alert(message.message);
    }

  }

}
