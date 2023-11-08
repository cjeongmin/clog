import MarkDownFile from "./MarkDownFile";

export class Tag {
  constructor(public name: string, public posts: MarkDownFile[] = []) {}
}
