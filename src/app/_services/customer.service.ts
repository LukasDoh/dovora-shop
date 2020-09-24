import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from '../masterdata/customers/customer.model';

/**
 * Customer Service: Interacts with customer list.
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customersChanged = new Subject<Customer[]>();

  private customers: Customer[] = [];

  constructor() {}

  /**
   * Sets customers
   * @param customers
   */
  setCustomers(customers: Customer[]) {
    this.customers = customers;
    this.customersChanged.next(this.customers.slice());
  }

  /**
   * Gets customers
   * @returns
   */
  getCustomers() {
    return this.customers.slice();
  }

  /**
   * Gets last customer
   * @returns
   */
  getLastCustomer() {
    return this.customers[this.customers.length - 1];
  }

  /**
   * Gets customer
   * @param id
   * @returns
   */
  getCustomer(id: number) {
    return this.customers.find((x) => x.id === id);
  }

  /**
   * Adds customer
   * @param customer
   */
  addCustomer(customer: Customer) {
    this.customers.push(customer);
    this.customersChanged.next(this.customers.slice());
  }

  /**
   * Updates customer
   * @param customer
   */
  updateCustomer(customer: Customer) {
    const callback = (element) => element.id === customer.id;
    const index: number = this.customers.findIndex(callback);
    if (index !== -1) {
      this.customers[index] = customer;
      this.customersChanged.next(this.customers.slice());
    }
  }

  /**
   * Removes customer
   * @param customer
   */
  removeCustomer(customer: Customer) {
    const callback = (element) => element.id === customer.id;
    const index: number = this.customers.findIndex(callback);
    if (index !== -1) {
      this.customers.splice(index, 1);
      this.customersChanged.next(this.customers.slice());
    }
  }
}
