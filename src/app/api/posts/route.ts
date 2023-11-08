import fs from "fs";
import { glob } from "glob";
import { NextRequest, NextResponse } from "next/server";

interface MarkDownFile {
  name: string;
  content: string;
  lastModified: Date;
  createAt: Date;
}

export async function GET(request: NextRequest) {
  const files = await glob("public/posts/*.md");

  const result: { [name: string]: MarkDownFile } = {};
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, "utf8");
      const stat = fs.statSync(file);
      const data: MarkDownFile = {
        name: file,
        content,
        lastModified: stat.mtime,
        createAt: stat.ctime,
      };

      result[file] = data;
    } catch (err) {
      console.error(err);
      return new NextResponse(JSON.stringify({ success: false }), {
        status: 204,
      });
    }
  }

  return new NextResponse(JSON.stringify(result));
}
