import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Customer } from '../../customers/customer.model';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CustomerService } from '../../../_services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

@Component({
  selector: 'app-customer-data-view',
  templateUrl: './customer-data-view.component.html',
  styleUrls: ['./customer-data-view.component.css'],
})
export class CustomerDataViewComponent implements OnInit {
  subscription: Subscription;
  customers: Customer[] = [];
  faPen = faPen;
  faPlus = faPlus;

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.subscription = this.customerService.customersChanged.subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
      }
    );
    this.customers = this.customerService.getCustomers();
  }

  onOpenAdd() {
    const modalRef = this.modalService.open(AddCustomerComponent);
  }

  onOpenEdit(customer: Customer) {
    const modalRef = this.modalService.open(EditCustomerComponent);
    modalRef.componentInstance.customer = customer;
  }
}
