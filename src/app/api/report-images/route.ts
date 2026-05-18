import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getMatchedImageBucketFromFilename, reportMilestones } from "@/lib/reporting";

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif)$/i;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user") === "carlos" ? "carlos" : "kurth";
  const milestones = reportMilestones[user] || reportMilestones.kurth;

  const folderPath = path.join(
    process.cwd(),
    "public",
    user === "carlos" ? "Carlos AR" : "Kurth AR",
    "PIctures for AR"
  );

  const groupedImages = milestones.reduce<Record<string, string[]>>((accumulator, milestone) => {
    accumulator[milestone.phase] = [];
    milestone.labels?.forEach((label) => {
      accumulator[`${milestone.phase} - ${label}`] = [];
      accumulator[label] = [];
    });
    return accumulator;
  }, {});

  if (!fs.existsSync(folderPath)) {
    return NextResponse.json({ groupedImages });
  }

  const imageFiles = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.test(entry.name))
    .map((entry) => entry.name);

  for (const fileName of imageFiles) {
    const matchedPhase = getMatchedImageBucketFromFilename(fileName, milestones);

    if (!matchedPhase) {
      continue;
    }

    groupedImages[matchedPhase].push(
      encodeURI(`/${user === "carlos" ? "Carlos AR" : "Kurth AR"}/PIctures for AR/${fileName}`)
    );
  }

  return NextResponse.json({ groupedImages });
}
