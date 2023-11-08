import { trimFileName } from "@/libs/post";
import MarkDownFile from "@/models/MarkDownFile";
import fs from "fs";
import { glob } from "glob";
import { NextRequest, NextResponse } from "next/server";

function getMarkDownFile(file: string): MarkDownFile {
  const content = fs.readFileSync(file, "utf8");
  const stat = fs.statSync(file);
  const data: MarkDownFile = {
    name: trimFileName(file),
    content,
    lastModified: new Date(stat.mtime),
    createAt: new Date(stat.ctime),
  };

  return data;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");

  const files = await glob(`**/*.md`, {
    ignore: ["README.md", "node_modules/**"],
  });

  if (files.length) {
    return new NextResponse(JSON.stringify(files));
  }

  if (!name) {
    const result: { [name: string]: MarkDownFile } = {};
    for (const file of files) {
      try {
        result[file] = getMarkDownFile(file);
      } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ success: false }), {
          status: 204,
        });
      }
    }
    return new NextResponse(JSON.stringify(result));
  } else {
    const file = files.find((v) => trimFileName(v) == name + ".md");
    if (!file) {
      return new NextResponse(JSON.stringify({ sucess: false }), {
        status: 400,
      });
    }

    try {
      return new NextResponse(JSON.stringify(getMarkDownFile(file)));
    } catch (err) {
      console.error(err);
      return new NextResponse(JSON.stringify({ success: false }), {
        status: 204,
      });
    }
  }
}
