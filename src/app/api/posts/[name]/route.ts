import { trimFileName } from "@/libs/post";
import MarkDownFile from "@/models/MarkDownFile";
import fs from "fs";
import { glob } from "glob";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { name } }: { params: { name: string } }
) {
  const files = await glob("public/posts/*.md");
  // const file = files.find((v) => v === "public/posts/" + name + ".md");
  return new NextResponse(JSON.stringify({ files }));

  // if (!file) {
  //   return new NextResponse(JSON.stringify({ success: false }), {
  //     status: 400,
  //   });
  // }

  // try {
  //   const content = fs.readFileSync(file, "utf8");
  //   const stat = fs.statSync(file);
  //   const data: MarkDownFile = {
  //     name: trimFileName(name),
  //     content,
  //     lastModified: new Date(stat.mtime),
  //     createAt: new Date(stat.ctime),
  //   };
  //   return new NextResponse(JSON.stringify(data));
  // } catch (err) {
  //   console.error(err);
  //   return new NextResponse(JSON.stringify({ success: false }), {
  //     status: 204,
  //   });
  // }
}
