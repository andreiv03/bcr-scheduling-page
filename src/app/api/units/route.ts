import { NextResponse } from "next/server";

import { ENV } from "@/config/constants";
import type { Unit } from "@/types/unit";

export const runtime = "nodejs";

interface BCR {
	replyStatus: {
		status: string;
	};
	serviceResponse: Unit[];
}

interface Coordinates {
	source: { latitude: number; longitude: number };
	destination: { latitude: number; longitude: number };
}

const calculateDistance = ({
	source: { latitude: lat1, longitude: lng1 },
	destination: { latitude: lat2, longitude: lng2 },
}: Coordinates) => {
	const R = 6371;
	const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

	const a =
		Math.sin(toRadians(lat2 - lat1) / 2) ** 2 +
		Math.cos(toRadians(lat1)) *
			Math.cos(toRadians(lat2)) *
			Math.sin(toRadians(lng2 - lng1) / 2) ** 2;

	return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);

		const source = {
			latitude: Number(searchParams.get("latitude")) || 0,
			longitude: Number(searchParams.get("longitude")) || 0,
		};

		const res = await fetch("https://api.bcr.ro/api/v1/appointments/branches", {
			headers: { apiKey: ENV.BCR_API_KEY },
			cache: "no-store",
		});

		const { replyStatus, serviceResponse } = (await res.json()) as BCR;
		if (replyStatus.status !== "OK" || !Array.isArray(serviceResponse)) {
			return NextResponse.json({ message: "Something went wrong with BCR API" }, { status: 400 });
		}

		const units = serviceResponse.map((unit) => {
			const destination = {
				latitude: Number(unit.location.latitude) || 0,
				longitude: Number(unit.location.longitude) || 0,
			};

			return {
				appointmentsSchedule: { isCashless: unit.appointmentsSchedule.isCashless ?? false },
				br_street: unit.br_street,
				branchId: unit.branchId,
				brn: unit.brn,
				distance: Math.round(calculateDistance({ source, destination }) * 100) / 100,
				location: { latitude: unit.location.latitude, longitude: unit.location.longitude },
				mfm_euro_all_day: !!unit.mfm_euro_all_day,
			};
		});

		return NextResponse.json({ units }, { status: 200 });
	} catch {
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
