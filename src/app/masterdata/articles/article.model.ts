/**
 * Article model
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
export class Article {
  public id: number;
  public name: string;
  public category: string;
  public price: number;

  constructor(id: number, name: string, price: number, category: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }
}
