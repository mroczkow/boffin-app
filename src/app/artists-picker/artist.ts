export class Artist {
  name: string;
  imageFileName: string;
  tags: string[];

  constructor(name: string, imageFileName: string, tags: string[]) {
    this.name = name;
    this.imageFileName = imageFileName;
    this.tags = tags;
  }
}
