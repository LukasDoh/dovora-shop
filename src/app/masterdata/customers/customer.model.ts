export class Customer {
  public id: number;
  public firstName: String;
  public lastName: String;
  public street: String;
  public zipCode: String;
  public city: String;
  public country: String;

  constructor(id: number, firstName: String, lastName: String, street: String, zipCode: String, city: String, country: String) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.street = street;
    this.zipCode = zipCode;
    this.city = city;
    this.country = country;
  }
}
