"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
  darkMode: boolean
  onToggle: () => void
}

export default function ThemeToggle({ darkMode, onToggle }: ThemeToggleProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggle = () => {
    setIsAnimating(true)
    onToggle()

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="p-2 hover:bg-gray-100 dark:hover:bg-[#3b5069] theme-transition relative overflow-hidden"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`w-5 h-5 absolute inset-0 text-yellow-500 icon-transition ${
            darkMode ? "opacity-0 transform rotate-90 scale-75" : "opacity-100 transform rotate-0 scale-100"
          } ${isAnimating && !darkMode ? "theme-toggle-enter" : ""}`}
        />
        <Moon
          className={`w-5 h-5 absolute inset-0 text-blue-400 icon-transition ${
            darkMode ? "opacity-100 transform rotate-0 scale-100" : "opacity-0 transform -rotate-90 scale-75"
          } ${isAnimating && darkMode ? "theme-toggle-enter" : ""}`}
        />
      </div>
    </Button>
  )
}
