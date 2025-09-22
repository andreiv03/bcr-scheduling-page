"use client";

import { createContext, useCallback, useMemo, useReducer } from "react";

import type { Operation } from "@/types/operation";
import type { TimeSlot } from "@/types/time-slot";
import type { Unit } from "@/types/unit";

interface LayoutState {
	step: number;
	operation: Operation | null;
	unit: Unit | null;
	timeSlot: TimeSlot | null;
	formData: {
		firstName: string;
		lastName: string;
		email: string;
	};
}

type LayoutAction =
	| { type: "SET_STEP"; payload: number }
	| { type: "SET_OPERATION"; payload: Operation | null }
	| { type: "SET_UNIT"; payload: Unit | null }
	| { type: "SET_TIME_SLOT"; payload: TimeSlot | null }
	| { type: "SET_FORM_DATA"; payload: { field: string; value: string } }
	| { type: "RESET_FORM_DATA" };

interface LayoutContext {
	state: LayoutState;
	setStep: (step: number) => void;
	setOperation: (operation: Operation | null) => void;
	setUnit: (unit: Unit | null) => void;
	setTimeSlot: (timeSlot: TimeSlot | null) => void;
	setFormData: (field: string, value: string) => void;
	resetAllStates: () => void;
}

export const LayoutContext = createContext<LayoutContext | null>(null);

const reducer = (state: LayoutState, action: LayoutAction): LayoutState => {
	switch (action.type) {
		case "SET_STEP":
			return { ...state, step: action.payload };

		case "SET_OPERATION":
			return { ...state, operation: action.payload };

		case "SET_UNIT":
			return { ...state, unit: action.payload };

		case "SET_TIME_SLOT":
			return { ...state, timeSlot: action.payload };

		case "SET_FORM_DATA":
			return {
				...state,
				formData: { ...state.formData, [action.payload.field]: action.payload.value },
			};

		case "RESET_FORM_DATA":
			return { ...state, formData: { firstName: "", lastName: "", email: "" } };

		default:
			return state;
	}
};

export function LayoutProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, {
		step: 1,
		operation: null,
		unit: null,
		timeSlot: null,
		formData: { firstName: "", lastName: "", email: "" },
	});

	const setStep = useCallback((step: number) => {
		dispatch({ type: "SET_STEP", payload: step });
	}, []);

	const setOperation = useCallback((operation: Operation | null) => {
		dispatch({ type: "SET_OPERATION", payload: operation });
	}, []);

	const setUnit = useCallback((unit: Unit | null) => {
		dispatch({ type: "SET_UNIT", payload: unit });
	}, []);

	const setTimeSlot = useCallback((timeSlot: TimeSlot | null) => {
		dispatch({ type: "SET_TIME_SLOT", payload: timeSlot });
	}, []);

	const setFormData = useCallback((field: string, value: string) => {
		dispatch({ type: "SET_FORM_DATA", payload: { field, value } });
	}, []);

	const resetAllStates = useCallback(() => {
		dispatch({ type: "SET_STEP", payload: 1 });
		dispatch({ type: "SET_OPERATION", payload: null });
		dispatch({ type: "SET_UNIT", payload: null });
		dispatch({ type: "SET_TIME_SLOT", payload: null });
		dispatch({ type: "RESET_FORM_DATA" });
	}, []);

	const contextValue = useMemo(
		() => ({
			state,
			setStep,
			setOperation,
			setUnit,
			setTimeSlot,
			setFormData,
			resetAllStates,
		}),
		[state, setStep, setOperation, setUnit, setTimeSlot, setFormData, resetAllStates],
	);

	return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>;
}
