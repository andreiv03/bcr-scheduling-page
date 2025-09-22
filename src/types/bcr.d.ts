import type { TimeSlot } from "@/types/time-slot";
import type { Unit } from "@/types/unit";

export interface BCR_Units {
	replyStatus: {
		status: string;
	};
	serviceResponse: Unit[];
}

export interface BCR_AvailableTimeList {
	serviceResponse: {
		day: string;
		timeSlots: TimeSlot[];
	}[];
}
