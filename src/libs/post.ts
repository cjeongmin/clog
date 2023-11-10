import MarkDownFile from "@/models/MarkDownFile";
import axios from "axios";
import { parse } from "yaml";
import path from "path";

type MetaData = {
  data: { [key: string]: any };
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
    const filePath = result[1];

    if (filePath.includes(".")) {
      if (path.extname(filePath) === ".pdf") {
        content = content.replace(
          `!${str}`,
          `<embed src="/static/${filePath.replaceAll(
            " ",
            "%20"
          )}" type="application/pdf" width="100%" height="500px">`
        );
      } else {
        content = content.replace(
          str,
          `[${filePath}](${`/static/${filePath.replaceAll(" ", "%20")}`})`
        );
      }
    } else {
      content = content.replace(
        str,
        `[${filePath}](${filePath.replaceAll(" ", "%20")})`
      );
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
