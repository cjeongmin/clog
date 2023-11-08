import { trimFileName } from "@/libs/post";
import MarkDownFile from "@/models/MarkDownFile";
import fs from "fs";
import { glob } from "glob";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const files = await glob(`${process.env.PWD}/public/posts/*.md`);

  const result: { [name: string]: MarkDownFile } = {};
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, "utf8");
      const stat = fs.statSync(file);
      const data: MarkDownFile = {
        name: trimFileName(file),
        content,
        lastModified: new Date(stat.mtime),
        createAt: new Date(stat.ctime),
      };

      result[file] = data;
    } catch (err) {
      console.error(err);
      return new NextResponse(
        JSON.stringify({
          success: false,
          path: `${process.env.PWD}/public/posts/*.md`,
        }),
        {
          status: 204,
        }
      );
    }
  }

  return new NextResponse(JSON.stringify(result));
}
