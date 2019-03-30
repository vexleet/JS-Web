import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FullNameValidatorDirective } from './directives/full-name-validator.directive';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { PhoneNumberValidatorDirective } from './directives/phone-number-validator.directive';
import { PasswordValidatorDirective } from './directives/password-validator.directive';
import { MatchPasswordsValidatorDirective } from './directives/match-passwords-validator.directive';
import { ImageDirective } from './directives/image.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    FullNameValidatorDirective,
    EmailValidatorDirective,
    PhoneNumberValidatorDirective,
    PasswordValidatorDirective,
    MatchPasswordsValidatorDirective,
    ImageDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
