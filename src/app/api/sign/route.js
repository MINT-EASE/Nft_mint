import { NextResponse } from "next/server";
import { pinata } from "@/utils/config";

// export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const data = await req.json();
    const url = await pinata.gateways.createSignedURL({
      cid: data.cid,
      expires: 30
    });
    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ text: "Error creating signed URL:" }, { status: 500 });
  }
}
