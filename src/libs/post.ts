import MarkDownFile, { DateValue } from "@/models/MarkDownFile";
import axios from "axios";
import path from "path";
import { parse } from "yaml";

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

export function changeLatexFormat(content: string): string {
  const pattern = /\$(.*?)\$/g;

  for (const token of content.matchAll(pattern)) {
    const str = token[0];
    const expr = token[1];

    content = content.replace(str, `\\\\(${expr}\\\\)`);
  }

  return content;
}

export async function loadPosts(): Promise<{
  date: MarkDownFile[];
  noDate: MarkDownFile[];
  tags: { [key: string]: MarkDownFile[] };
}> {
  const ret: {
    date: MarkDownFile[];
    noDate: MarkDownFile[];
    tags: { [key: string]: MarkDownFile[] };
  } = {
    date: [],
    noDate: [],
    tags: {},
  };

  const response = await axios.get("/api/posts");
  const data: { [name: string]: MarkDownFile } = response.data;

  for (const key in data) {
    const file = data[key];

    if (!file.publish) {
      continue;
    }

    if (file.date != DateValue.NoDate) {
      ret.date.push(file);
    } else {
      ret.noDate.push(file);
    }

    for (const tag of file.tags) {
      if (tag in ret.tags) {
        ret.tags[tag].push(file);
      } else {
        ret.tags[tag] = [file];
      }
    }
  }

  return ret;
}
