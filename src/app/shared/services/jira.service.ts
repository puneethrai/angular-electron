import { Injectable } from '@angular/core';
import * as JiraApi from 'jira-client';
import * as  assert from 'assert';
@Injectable({
  providedIn: 'root'
})
export class Jira {
  private jira: JiraApi
  constructor() { }
  /**
   * Login to Jira
   * @param option
   * @example
   * await jira.onLogin({
   * protocol: 'https',
   * host: 'at.mavenir.com',
   * username: 'username',
   * password: 'password',
   * strictSSL: true,
   * apiVersion: 'latest',
   * base: 'jira'
   * })
   */
  async onLogin(option: JiraApi.JiraApiOptions) {
    let jira = new JiraApi(option);
    let response = await jira.getAllBoards();
    assert.equal(typeof {}, typeof response, "Unable to login");
    this.jira = jira;
  }
}
