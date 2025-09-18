import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  height?: "half" | "full" | "auto"
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  height = "auto"
}: BottomSheetProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      // Prevent body scroll when sheet is open
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable body scroll
      document.body.style.overflow = ''
      // Delay unmounting to allow exit animation
      const timer = setTimeout(() => setMounted(false), 300)
      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!mounted) return null

  const heightClasses = {
    half: "max-h-[50vh]",
    full: "max-h-[90vh]",
    auto: "max-h-[80vh]"
  }

  return (
    <>
      {/* Backdrop with glassmorphism */}
      <div
        className={`fixed inset-0 z-50 glass-overlay backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        data-testid="bottom-sheet-backdrop"
      />
      
      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 glass-card border-t shadow-2xl transform transition-transform duration-400 ease-out ${
          isOpen ? "bottom-sheet-enter" : "bottom-sheet-exit"
        } ${heightClasses[height]}`}
        data-testid="bottom-sheet-content"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full"></div>
        </div>
        
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b glass-overlay">
            <h2 className="text-lg font-semibold" data-testid="bottom-sheet-title">
              {title}
            </h2>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="haptic-feedback"
              data-testid="button-close-bottom-sheet"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </>
  )
}