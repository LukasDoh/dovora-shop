import { Component, OnInit, Input } from '@angular/core';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from 'src/app/masterdata/customers/customer.model';
import { CustomerService } from 'src/app/_services/customer.service';
import { DataStorageService } from 'src/app/_services/data-storage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  faSave = faSave;
  faTrash = faTrash;
  editForm: FormGroup;
  @Input() customer: Customer;

  constructor(
    private customerService: CustomerService,
    private dataService: DataStorageService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.editForm.setValue(this.customer);
  }

  onSave() {
    this.customerService.updateCustomer(this.editForm.getRawValue());
    this.dataService.updateCustomer(this.editForm.getRawValue());
    this.activeModal.close();
  }

  onDelete() {
    const id = this.editForm.get('id').value;
    this.customerService.removeCustomer(this.editForm.getRawValue());
    this.dataService.deleteCustomer(id);
    this.activeModal.close();
  }

  onClose() {
    this.activeModal.close();
  }
}
