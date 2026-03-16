import { NextResponse } from "next/server";
import { getRidersApi } from "@/services/apis/riders.api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") ?? undefined;
  const limit = searchParams.get("limit") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const status = searchParams.get("status") ?? undefined;

  const rsp = await getRidersApi({ page, limit, search, status });

  if (!rsp.ok) {
    return NextResponse.json(rsp.body, { status: rsp.status });
  }

  return NextResponse.json(rsp.body, { status: 200 });
}

