import { changeLatexFormat, getMetaData, replaceLinks } from "@/libs/post";
import MarkDownFile, { DateValue } from "@/models/MarkDownFile";
import fs from "fs";
import { glob } from "glob";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: NextRequest,
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
    const fileName = path.basename(name);
    const content = fs.readFileSync(file, "utf8");
    const metadata = getMetaData(content);

    const data: MarkDownFile = {
      name: fileName,
      content: changeLatexFormat(replaceLinks(metadata.content)),
      date: metadata.data["date"] ?? DateValue.NoDate,
      publish: metadata.data["publish"] ?? true,
      tags: metadata.data["tags"] ?? [],
    };
    return new NextResponse(JSON.stringify(data));
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ success: false }), {
      status: 204,
    });
  }
}
