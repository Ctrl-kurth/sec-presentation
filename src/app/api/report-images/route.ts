import { NextResponse } from "next/server";
import { getMatchedImageBucketFromFilename, reportMilestones } from "@/lib/reporting";
import imageData from "@/lib/imageData.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userParam = searchParams.get("user") === "carlos" ? "carlos" : "kurth";
  const user = userParam as keyof typeof imageData;
  const milestones = reportMilestones[user] || reportMilestones.kurth;

  const groupedImages = milestones.reduce<Record<string, string[]>>((accumulator, milestone) => {
    accumulator[milestone.phase] = [];
    milestone.labels?.forEach((label) => {
      accumulator[`${milestone.phase} - ${label}`] = [];
      accumulator[label] = [];
    });
    return accumulator;
  }, {});

  const imageFiles = imageData[user] || [];

  for (const fileName of imageFiles) {
    const matchedPhase = getMatchedImageBucketFromFilename(fileName, milestones);

    if (!matchedPhase) {
      continue;
    }

    groupedImages[matchedPhase].push(
      encodeURI(
        `/${user === "carlos" ? "Carlos AR" : "Kurth AR"}/${
          user === "carlos" ? "Pictures for AR" : "PIctures for AR"
        }/${fileName}`
      )
    );
  }

  return NextResponse.json({ groupedImages });
}
