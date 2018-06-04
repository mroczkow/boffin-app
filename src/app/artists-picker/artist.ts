export class Artist {
  name: string;
  imageUrl: string;
  tags: string[];

  constructor(name: string, imageUrl: string, tags: string[]) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.tags = tags;
  }
}
