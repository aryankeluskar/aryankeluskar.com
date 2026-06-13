"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  domAnimation,
  LazyMotion,
  m,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import React, { PropsWithChildren, useRef } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border",
);

function Dock({
  className,
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  ref,
  ...props
}: DockProps) {
  const mousex = useMotionValue(Infinity);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        onMouseMove={(e) => mousex.set(e.pageX)}
        onMouseLeave={() => mousex.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }))}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                mousex,
                magnification,
                distance,
              } as DockIconProps)
            : child,
        )}
      </m.div>
    </LazyMotion>
  );
}

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mousex?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

function DockIcon({
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mousex,
  className,
  children,
  ...props
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  const fallbackMotion = useMotionValue(Infinity);
  const source = mousex ?? fallbackMotion;

  const distanceCalc = useTransform(source, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40],
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <m.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </m.div>
  );
}

export { Dock, DockIcon, dockVariants };
