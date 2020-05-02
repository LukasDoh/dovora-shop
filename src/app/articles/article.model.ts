export class Article {
  public name: string;
  public imagePath: string;
  public description: string;
  public price: number;

  constructor(name: string, imgPath: string, desc: string, price: number) {
    this.name = name;
    this.imagePath = imgPath;
    this.description = desc;
    this.price = price;
  }
}
