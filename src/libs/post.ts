import axios from "axios";
import { parse } from "yaml";

const githubUsername = process.env.NEXT_PUBLIC_USER_NAME;
const githubRepository = process.env.NEXT_PUBLIC_REPOSITORY_NAME;
const apiUrl = `https://api.github.com/repos/${githubUsername}/${githubRepository}/contents/`;
const contentUrl = `https://raw.githubusercontent.com/cjeongmin/blog-posts/main/`;

interface BlogPostFile {
  htmlURL: string;
  name: string;
  path: string;
  type: string;
  url: string;
  date: Date;
}

export async function fetchPosts(): Promise<BlogPostFile[]> {
  const res: BlogPostFile[] = [];

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        // Authorization: `token ${personalAccessToken}`,
      },
    });

    if (response.status === 200) {
      const contentData = response.data;
      for (const data of contentData) {
        if (!data.name.endsWith(".md") || data.name == "README.md") {
          continue;
        }

        res.push({
          htmlURL: data.html_url,
          name: data.name,
          path: data.path,
          type: data.path,
          url: data.url,
          date: (await getFileLastModified(data.path)) || new Date(),
        });
      }
    } else {
      console.error("Failed to fetch data from GitHub API");
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }

  return res;
}

export async function getFileContent(filePath: string): Promise<string> {
  let content: string = "";

  try {
    const response = await axios.get(apiUrl + filePath, {
      headers: {
        // Authorization: `token ${personalAccessToken}`,
      },
    });

    if (response.status === 200) {
      content = Buffer.from(response.data.content, "base64").toString("utf-8");
    } else {
      console.error("Failed to fetch file content from GitHub API");
    }
  } catch (error) {
    console.error("An error occurred while fetching file content:", error);
  }

  return content;
}

export async function getFileLastModified(
  filePath: string
): Promise<Date | null> {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${githubUsername}/${githubRepository}/commits`,
      {
        headers: {
          // Authorization: `token ${personalAccessToken}`,
        },
        params: {
          path: filePath,
          per_page: 1,
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;
      return new Date(data[0].commit.committer.date);
    } else {
      console.error("Failed to fetch file content from Github API");
    }
  } catch (error) {
    console.error("An error occurred while fetching file content:", error);
  }
  return null;
}

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
      content = content.replace(str, `[${path}](${contentUrl + path})`);
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