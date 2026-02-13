"use client"

import { motion, useInView, HTMLMotionProps } from "framer-motion"
import { ReactNode, useRef } from "react"

interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
  threshold?: number
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 40,
  once = true,
  threshold = 0.2,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
