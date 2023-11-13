import MarkDownFile from "@/models/MarkDownFile";
import fs from "fs";
import { glob } from "glob";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  const url = path.resolve("public/posts");
  const files = await glob(path.resolve(`${url}/*.md`));

  const result: { [name: string]: MarkDownFile } = {};
  for (const file of files) {
    try {
      const fileName = path.basename(file);
      const content = fs.readFileSync(file, "utf8");
      const stat = fs.statSync(file);
      const data: MarkDownFile = {
        name: fileName,
        content,
        lastModified: new Date(stat.mtime),
        createAt: new Date(stat.ctime),
      };

      result[fileName] = data;
    } catch (err) {
      console.error(err);
      return new NextResponse(JSON.stringify({ success: false }), {
        status: 204,
      });
    }
  }

  return new NextResponse(JSON.stringify(result));
}
