"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted on the client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Render a placeholder until mounted
  if (!mounted) {
    return <Button variant="ghost" size="icon" disabled className="h-9 w-9" />;
  }
  
  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
      aria-label="Toggle theme"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={resolvedTheme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  )
}
