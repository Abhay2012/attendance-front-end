import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
// https://www.toptal.com/angular-js/angular-4-forms-validation

@Component({
  selector: 'nl-show-errors',
  template: `
    <ul *ngIf="shouldShowErrors()">
      <li style="color: red" *ngFor="let error of listOfErrors()">{{error}}</li>
    </ul>
  `,
})

export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message,
    'pastDate': (params) => params.message,
    'min': (params) => params.message,
    'max': (params) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {

    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    // remove  checkstringOnlySpace if the field is already required
    // if (this.control.errors.required == true) {
    //   delete this.control.errors.checkStringOnlySpace;
    // }
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }

}
