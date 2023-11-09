import fs from "fs";
import { trimFileName } from "@/libs/post";
import { glob } from "glob";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import path from "path";
import MarkDownFile from "@/models/MarkDownFile";

export async function GET(
  request: NextApiRequest,
  { params: { name } }: { params: { name: string } }
) {
  const url = path.resolve("public/posts");
  const files = await glob(path.resolve(`${url}/*.md`));
  const file = files.find((v) => v === `${url}/${name}.md`);

  if (!file) {
    return new NextResponse(JSON.stringify({ success: false }), {
      status: 400,
    });
  }

  try {
    const fileName = trimFileName(name);
    const content = fs.readFileSync(file, "utf8");
    const stat = fs.statSync(file);
    const data: MarkDownFile = {
      name: fileName,
      content,
      lastModified: new Date(stat.mtime),
      createAt: new Date(stat.ctime),
    };
    return new NextResponse(JSON.stringify(data));
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ success: false }), {
      status: 204,
    });
  }
}
