/**
 * Article category model
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
export class ArticleCategory {
  public id: number;
  public name: String;

  constructor(id: number, name: String) {
    this.id = id;
    this.name = name;
  }
}
