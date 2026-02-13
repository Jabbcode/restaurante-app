"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { ReactNode } from "react"

interface StaggerChildrenProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  staggerDelay?: number
  childDelay?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; childDelay: number }) => ({
    opacity: 1,
    transition: {
      delayChildren: custom.childDelay,
      staggerChildren: custom.staggerDelay,
    },
  }),
}

export default function StaggerChildren({
  children,
  staggerDelay = 0.1,
  childDelay = 0,
  ...props
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={{ staggerDelay, childDelay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Child item component for use with StaggerChildren
interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
}

const itemVariants = {
  hidden: (custom: { direction: string; distance: number }) => {
    const directions: Record<string, object> = {
      up: { y: custom.distance },
      down: { y: -custom.distance },
      left: { x: custom.distance },
      right: { x: -custom.distance },
      none: {},
    }
    return {
      opacity: 0,
      ...directions[custom.direction],
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const, // easeOut cubic bezier
    },
  },
}

export function StaggerItem({
  children,
  direction = "up",
  distance = 24,
  ...props
}: StaggerItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      custom={{ direction, distance }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
