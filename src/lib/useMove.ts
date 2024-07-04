import { useEffect, RefObject, useRef } from "react";

const SCREEN_HEIGHT = 1100;
const COL_HEIGHT = 600;
const COL_GAP = 100;

const triggers: { [key: number]: number } = {
	1: 400,
	2: 800,
	3: 1000,
};

const useMoveIt = (
	ref: RefObject<HTMLElement>,
	speed: number,
	refScroll: RefObject<HTMLElement>,
	id: number
	// onCloseToEnd: () => void
): void => {
	const isVisibilitySet = useRef(false);
	const prevTranslate = useRef(0);

	const initPosition = useRef(-1);

	useEffect(() => {
		if (initPosition.current === -1 && ref.current) {
			initPosition.current = ref.current.offsetTop;
		}
		const handleScroll = (e: WheelEvent) => {
			if (ref.current && refScroll.current) {
				let direction = e.deltaY > 0 ? "DOWN" : "UP";

				let newTranslate = prevTranslate.current + -1 * e.deltaY;

				const isVisible = isVisibleInContainer(ref.current, refScroll.current);

				ref.current.innerText = `${id}-${isVisible}`;

				prevTranslate.current = newTranslate;
				ref.current.style.transform = `translateY(${newTranslate}px)`;

				// const scrollDelta = Math.abs(
				// 	initPosition.current - Math.abs(newTranslate)
				// );

				// APPEND TO BOTTOM OR TOP LOGIC -
				// if (direction === "DOWN") {
				// 	console.log("isVisible", isVisible, id);
				// 	if (
				// 		!isVisibilitySet.current &&
				// 		Math.abs(newTranslate) >= triggers[id]
				// 	) {
				// 		isVisibilitySet.current = true;
				// 		newTranslate = COL_HEIGHT;
				// 	} else {
				// 		if (isVisible) isVisibilitySet.current = false;
				// 	}
				// }
				// else if (direction === "UP") {
				// 	if (Math.abs(newTranslate) >= SCREEN_HEIGHT)
				// 		newTranslate = -SCREEN_HEIGHT;
				// }

				// if (refScroll.current) {
				// 	if (!isVisibleInContainer(ref.current, refScroll.current)) {
				// 		if (!isVisibilitySet.current) {
				// 			console.log("ref.current.clientHeight", ref.current.clientHeight);
				// 			if (direction === "DOWN") {
				// 				isVisibilitySet.current = true;
				// 				newTranslate = COL_HEIGHT + initPosition.current;
				// 				prevTranslate.current = newTranslate;

				// 				ref.current.style.transform = `translateY(${newTranslate}px)`;
				// 			} else {
				// 				isVisibilitySet.current = true;

				// 				newTranslate = -COL_HEIGHT - initPosition.current;
				// 				prevTranslate.current = newTranslate;

				// 				ref.current.style.transform = `translateY(${newTranslate}px)`;
				// 			}
				// 		}
				// 	} else {
				// 		isVisibilitySet.current = false;
				// 	}
				// }

				// if (refScroll.current) {
				// 	if (
				// 		!isVisibleInContainer(ref.current, refScroll.current) &&
				// 		!isVisibilitySet.current
				// 	) {
				// 		isVisibilitySet.current = true;
				// 		if (direction === -1) {
				// 			ref.current.style.transform = `translateY(-${}px)`;
				// 		} else {
				// 			ref.current.style.transform = `translateY(${SCREEN_HEIGHT}px)`;
				// 		}
				// 	} else {
				// 		isVisibilitySet.current = false;
				// 	}
				// }

				// if (e.offsetY >= 700) {
				// 	onCloseToEnd();
				// }
			}
		};
		const containerElement = refScroll?.current;
		containerElement?.addEventListener("wheel", handleScroll);

		return () => {
			containerElement?.removeEventListener("wheel", handleScroll);
		};
	}, [ref, speed]);
};

export default useMoveIt;

export function isVisibleInContainer(
	element: HTMLElement,
	container: HTMLElement
) {
	const { bottom, height, top } = element.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();

	return top <= containerRect.top
		? containerRect.top - top <= height
		: bottom - containerRect.bottom <= height;
}

function getTranslateY(element: HTMLElement) {
	var style = window.getComputedStyle(element);
	var matrix = new WebKitCSSMatrix(style.transform);
	console.table(matrix);
	return matrix.m42;
}
