import { NextResponse } from "next/server";

import { ENV } from "@/config/constants";
import type { BCR_AvailableTimeList } from "@/types/bcr";

export const runtime = "nodejs";

const toDateOnly = (s?: string | null) => (s ? s.slice(0, 10) : undefined); // "YYYY-MM-DD"

export async function GET(req: Request, ctx: { params: Promise<{ id?: string }> }) {
	try {
		const { id } = await ctx.params;
		const branchId = id?.trim();
		if (!branchId) {
			return NextResponse.json({ message: "Branch ID not found" }, { status: 404 });
		}

		const { searchParams } = new URL(req.url);
		const operationId = (searchParams.get("operationId") || "1").trim();
		const dateParam = toDateOnly(searchParams.get("date"));

		const queries = new URLSearchParams({ operationId, branchId });
		const res = await fetch(
			`https://api.bcr.ro/api/v1/appointments/availableTime?${queries.toString()}`,
			{
				headers: { apiKey: ENV.BCR_API_KEY },
				cache: "no-store",
			},
		);

		console.log(`https://api.bcr.ro/api/v1/appointments/availableTime?${queries.toString()}`);

		const { serviceResponse } = (await res.json()) as BCR_AvailableTimeList;
		console.log(serviceResponse);
		if (!Array.isArray(serviceResponse)) {
			return NextResponse.json({ message: "Something went wrong with BCR API" }, { status: 400 });
		}

		const chosen =
			(dateParam && serviceResponse.find((item) => toDateOnly(item.day) === dateParam)) ||
			serviceResponse[0];

		const slots = Array.isArray(chosen?.timeSlots) ? chosen.timeSlots : [];
		return NextResponse.json({ timeSlots: slots }, { status: 200 });
	} catch {
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
