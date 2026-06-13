"use client";

import * as React from "react";

interface GridState {
  opacity: number;
  mouseX: number;
  mouseY: number;
  isOverText: boolean;
  isMounted: boolean;
}

type GridAction =
  | { type: "mount" }
  | { type: "scroll"; opacity: number }
  | { type: "mouse"; x: number; y: number; isOverText: boolean };

const initialState: GridState = {
  opacity: 0.08,
  mouseX: 0,
  mouseY: 0,
  isOverText: false,
  isMounted: false,
};

function reducer(state: GridState, action: GridAction): GridState {
  switch (action.type) {
    case "mount":
      return { ...state, isMounted: true };
    case "scroll":
      return state.opacity === action.opacity ? state : { ...state, opacity: action.opacity };
    case "mouse":
      return { ...state, mouseX: action.x, mouseY: action.y, isOverText: action.isOverText };
  }
}

function computeOpacity(scrollPosition: number): number {
  const fadeStartPoint = 100;
  const fadeEndPoint = 400;
  if (scrollPosition <= fadeStartPoint) return 0.08;
  if (scrollPosition >= fadeEndPoint) return 0.02;
  const fadeRange = fadeEndPoint - fadeStartPoint;
  return 0.08 * (1 - (scrollPosition - fadeStartPoint) / fadeRange);
}

export function BlueprintGrid() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({ type: "mount" });

    const handleScroll = () => {
      dispatch({ type: "scroll", opacity: computeOpacity(window.scrollY) });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const element = document.elementFromPoint(clientX, clientY);
      const isText = !!element?.closest(
        'h1, h2, h3, p, span, .prose, .nameButtons, article, .text-muted-foreground, div[role="heading"]',
      );
      dispatch({ type: "mouse", x: clientX, y: clientY, isOverText: isText });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!state.isMounted) return null;

  const baseOpacity = state.opacity;
  const spotlightOpacity = baseOpacity + (state.isOverText ? -0.02 : 0.035);

  return (
    <div className="fixed inset-0 -z-50 h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--grid-color)) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--grid-color)) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          opacity: baseOpacity,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-150"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--grid-color)) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--grid-color)) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          opacity: spotlightOpacity,
          mask: `radial-gradient(circle at ${state.mouseX}px ${state.mouseY}px, black 0%, transparent 150px)`,
          WebkitMask: `radial-gradient(circle at ${state.mouseX}px ${state.mouseY}px, black 0%, transparent 150px)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
