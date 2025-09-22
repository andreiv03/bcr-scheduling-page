import { NextResponse } from "next/server";

import { ENV } from "@/config/constants";
import type { Operation } from "@/types/operation";

export const runtime = "nodejs";

interface BCR {
	replyStatus: {
		status: string;
	};
	serviceResponse: Operation[];
}

export async function GET() {
	try {
		const res = await fetch("https://api.bcr.ro/api/v2/appointments/operations?clientType=pf", {
			headers: { apiKey: ENV.BCR_API_KEY },
			cache: "no-store",
		});

		const { replyStatus, serviceResponse } = (await res.json()) as BCR;
		if (replyStatus.status !== "OK" || !Array.isArray(serviceResponse)) {
			return NextResponse.json({ message: "Something went wrong with BCR API" }, { status: 400 });
		}

		return NextResponse.json({ operations: serviceResponse }, { status: 200 });
	} catch {
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
