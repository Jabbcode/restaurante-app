"use client"

import { useState, useCallback } from "react"
import ConfirmModal from "@/components/ui/ConfirmModal"

interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "info"
}

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions>({
    title: "",
    message: "",
  })
  const [resolveRef, setResolveRef] = useState<((value: boolean) => void) | null>(null)

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts)
    setIsOpen(true)
    setIsLoading(false)

    return new Promise((resolve) => {
      setResolveRef(() => resolve)
    })
  }, [])

  const handleConfirm = useCallback(() => {
    setIsLoading(true)
    resolveRef?.(true)
    setIsOpen(false)
    setIsLoading(false)
  }, [resolveRef])

  const handleCancel = useCallback(() => {
    resolveRef?.(false)
    setIsOpen(false)
  }, [resolveRef])

  const ConfirmDialog = useCallback(() => (
    <ConfirmModal
      isOpen={isOpen}
      title={options.title}
      message={options.message}
      confirmText={options.confirmText}
      cancelText={options.cancelText}
      variant={options.variant}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  ), [isOpen, options, handleConfirm, handleCancel, isLoading])

  return { confirm, ConfirmDialog, setIsLoading }
}
