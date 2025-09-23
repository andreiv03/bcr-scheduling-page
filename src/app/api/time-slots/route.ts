import { NextResponse } from "next/server";

import { ENV } from "@/config/constants";
import type { TimeSlot } from "@/types/time-slot";

export const runtime = "nodejs";

interface BCR {
	serviceResponse: {
		availableTimeList: {
			day: string;
			timeSlots: TimeSlot[];
		}[];
	};
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const operationId = searchParams.get("operationId") || "1";
		const branchId = searchParams.get("branchId") || "";
		const date = searchParams.get("date");

		const queries = new URLSearchParams({ operationId, branchId });
		const res = await fetch(
			`https://api.bcr.ro/api/v1/appointments/availableTime?${queries.toString()}`,
			{
				headers: { apiKey: ENV.BCR_API_KEY },
				cache: "no-store",
			},
		);

		const { serviceResponse } = (await res.json()) as BCR;
		if (!Array.isArray(serviceResponse.availableTimeList)) {
			return NextResponse.json({ message: "Something went wrong with BCR API" }, { status: 400 });
		}

		const list = serviceResponse.availableTimeList ?? [];
		const chosen = date ? list.find((item) => item.day === date) ?? list[0] : list[0];

		const timeSlots = chosen?.timeSlots ?? [];
		return NextResponse.json({ timeSlots }, { status: 200 });
	} catch {
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
