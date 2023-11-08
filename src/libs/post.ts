import MarkDownFile from "@/models/MarkDownFile";
import axios from "axios";
import { parse } from "yaml";

type MetaData = {
  data: {};
  content: string;
};

export function getMetaData(fileContent: string): MetaData {
  if (fileContent.startsWith("---")) {
    const tokens = fileContent.split("---");
    if (tokens.length < 2) {
      return {
        data: {},
        content: fileContent,
      };
    }

    const data = parse(tokens[1]);

    let index = 3;
    while (
      index + 3 < fileContent.length &&
      fileContent.slice(index, index + 3) != "---"
    ) {
      index += 1;
    }

    return {
      data,
      content: fileContent.slice(index + 3, fileContent.length).trim(),
    };
  }

  return {
    data: {},
    content: fileContent,
  };
}

export function replaceLinks(content: string): string {
  const linkPattern = /\[\[(.*)\]\]/g;

  for (const result of content.matchAll(linkPattern)) {
    const str = result[0];
    const path = result[1];

    if (path.includes(".")) {
      content = content.replace(str, `[${path}](${`/static/${path}`})`);
    } else {
      content = content.replace(str, `[${path}](${path})`);
    }
  }

  return content;
}

export function postDateFormatter(date: Date): string {
  const paddingZero = (x: number) => {
    return x.toString().padStart(2, "0");
  };

  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ];
  const [hour, minute] = [date.getHours(), date.getMinutes()];

  return `${year}.${paddingZero(month + 1)}.${paddingZero(day)} - ${paddingZero(
    hour
  )}:${paddingZero(minute)}`;
}

export function trimFileName(fileName: string): string {
  let ret = "";
  for (let i = fileName.length - 1; i >= 0; i--) {
    if (fileName[i] == "/") {
      break;
    }
    ret = fileName[i] + ret;
  }
  return ret;
}

export async function loadPosts(): Promise<MarkDownFile[]> {
  const ret: MarkDownFile[] = [];

  const response = await axios.get("/api/posts");
  const data: { [name: string]: MarkDownFile } = response.data;

  for (const key in data) {
    const value = data[key];
    ret.push({
      name: value.name,
      content: value.content,
      createAt: new Date(value.createAt),
      lastModified: new Date(value.lastModified),
    });
  }

  return ret;
}
