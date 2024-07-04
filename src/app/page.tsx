"use client";

import useMoveIt from "@/lib/useMove";
import { RefObject, useRef, useState } from "react";

const col2 = [1, 2, 3];
const col3 = [1, 2, 3];

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);
	const col1Ref = useRef<HTMLDivElement>(null);

	const [col1, setCol1] = useState([1, 2, 3]);

	return (
		<main className="h-screen w-screen bg-black flex gap-2">
			<div className="w-[50px] shrink-0 bg-red-400" />
			<div
				className="h-screen w-full overflow-hidden relative"
				ref={containerRef}
			>
				<div className="absolute w-full top-0 left-0 ">
					<div
						ref={col1Ref}
						className="flex flex-col gap-[100px] h-[600px] overflow-hidden bg-cyan-800"
					>
						{col1.map((item, index) => (
							<ColItem
								key={`col1-${index}`}
								item={item}
								index={index}
								containerRef={containerRef}
							/>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}

function ColItem({
	item,
	index,
	containerRef,
}: {
	item: number;
	index: number;
	containerRef: RefObject<HTMLElement>;
}) {
	const ref = useRef<HTMLDivElement>(null);
	console.log(ref.current?.offsetTop);

	useMoveIt(ref, 1, containerRef, index + 1);

	return (
		<div
			ref={ref}
			className="bg-red-600 will-change-transform border border-cyan-300 shrink-0"
			style={{ width: "300px", height: `400px` }}
		>
			{index + 1}
		</div>
	);
}
