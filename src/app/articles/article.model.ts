export class Article {
  public id: number;
  public name: string;
  public imgName: string;
  public category: string;
  public price: number;

  constructor(id: number, name: string, imgName: string, price: number, category: string) {
    this.id = id;
    this.name = name;
    this.imgName = imgName;
    this.price = price;
    this.category = category;
  }
}
