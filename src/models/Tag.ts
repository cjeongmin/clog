import PostModel from "./PostModel";

export class Tag {
  constructor(public name: string, public posts: PostModel[] = []) {}
}
