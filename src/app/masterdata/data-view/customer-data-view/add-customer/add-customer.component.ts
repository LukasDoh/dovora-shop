import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/masterdata/customers/customer.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Customer } from 'src/app/masterdata/customers/customer.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  nextCustomerId: number = 0;
  addForm: FormGroup;
  faSave = faSave;
  faPlus = faPlus;

  constructor(
    private activeModal: NgbActiveModal,
    private customerService: CustomerService,
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.nextCustomerId = this.customerService.getLastCustomer().id + 1;
    this.addForm = this.formBuilder.group({
      id: [{ value: this.nextCustomerId, disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  onSave(addMultiple: Boolean) {
    const value = this.addForm.getRawValue();
    const newCustomer = new Customer(
      value.id,
      value.firstName,
      value.lastName,
      value.street,
      value.zipCode,
      value.city,
      value.country
    );
    this.customerService.addCustomer(newCustomer);
    this.dataStorageService.saveNewestCustomer();
    this.addForm.reset();
    if (addMultiple === false) {
      this.activeModal.close();
    }
    this.nextCustomerId += 1;
    this.addForm.controls.id.setValue(this.nextCustomerId);
  }

  onClose() {
    this.activeModal.close();
  }
}
