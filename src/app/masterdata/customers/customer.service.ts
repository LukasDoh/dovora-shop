import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customersChanged = new Subject<Customer[]>();

  private customers: Customer[] = [];

  constructor() {}

  setCustomers(customers: Customer[]) {
    this.customers = customers;
    this.customersChanged.next(this.customers.slice());
  }

  getCustomers() {
    return this.customers.slice();
  }

  getLastCustomer() {
    return this.customers[this.customers.length - 1];
  }

  getCustomer(id: number) {
    return this.customers.find((x) => x.id === id);
  }

  addCustomer(customer: Customer) {
    this.customers.push(customer);
    this.customersChanged.next(this.customers.slice());
  }

  updateCustomer(customer: Customer) {
    const callback = (element) => element.id === customer.id;
    const index: number = this.customers.findIndex(callback);
    if (index !== -1) {
      this.customers[index] = customer;
      this.customersChanged.next(this.customers.slice());
    }
  }

  removeCustomer(customer: Customer) {
    const callback = (element) => element.id === customer.id;
    const index: number = this.customers.findIndex(callback);
    if (index !== -1) {
      this.customers.splice(index, 1);
      this.customersChanged.next(this.customers.slice());
    }
  }
}
