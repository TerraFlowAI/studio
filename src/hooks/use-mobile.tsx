import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Default to false on the server and initial client render for consistency
  const [isMobile, setIsMobile] = React.useState<boolean>(false) 

  React.useEffect(() => {
    // This effect runs only on the client, after hydration
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(mql.matches) // Use mql.matches directly
    }
    
    // Set initial state on client based on current window size once component mounts
    onChange(); 
    
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, []) // Empty dependency array ensures this runs once on mount (client-side)

  return isMobile // Returns a consistent boolean, initially false, then updated on client
}
