import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  phoneCodes: string[] = [
    '+971',
    '+359',
    '+972',
    '+198',
    '+701'
  ];
  jobTitles: string[] = [
    'Designer',
    'Manager',
    'Accounting'
  ];

  constructor() { }

  ngOnInit() { }

  handleSubmit() {
    console.log(this.form.value);

    this.form.reset();
  }

}
