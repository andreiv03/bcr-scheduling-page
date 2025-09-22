import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { LayoutProvider } from "@/contexts/layout-context";

import "@/styles/globals.scss";

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "BCR Scheduling Page",
	description: "BCR Scheduling Page",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.variable}>
				<LayoutProvider>{children}</LayoutProvider>
			</body>
		</html>
	);
}
