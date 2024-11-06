import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Customer } from '../Customer';
import { CustomerService } from '../customer.service';
import { notNullOrEmptyValidator } from '../utils/validate-input.directive';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
  profileForm!: FormGroup;


  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', notNullOrEmptyValidator()],
      address: this.formBuilder.group({
        street: [''],
        apartment: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      })
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.customerService.addCustomer(this.profileForm.value as Customer)
        .subscribe(
          customer => {
            if (customer === undefined) {
              alert(`Error occurred while saving Customer.`);
            }
            else {
              alert(`Customer ${customer.name} saved successfully with following details:
                street: ${customer.address.street}
                apartment: ${customer.address.apartment}
                city: ${customer.address.city}
                state: ${customer.address.state}
                country: ${customer.address.country}
                zipcode: ${customer.address.zipcode}`);
              this.profileForm.reset();
            }
          }
        );
    }
  }

  get name() {
    return this.profileForm.get('name')!;
  }

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) { }
}
