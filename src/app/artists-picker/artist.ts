export class Artist {
  name: string;
  imagePath: string;
  tags: string[];

  constructor(name: string, imagePath: string, tags: string[]) {
    this.name = name;
    this.imagePath = imagePath;
    this.tags = tags;
  }
}
