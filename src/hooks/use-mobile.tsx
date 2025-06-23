import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false) 
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // This effect runs only on the client, after hydration
    setMounted(true);
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Set initial state on client based on current window size
    setIsMobile(mql.matches);
    
    const onChange = () => {
      setIsMobile(mql.matches)
    }
    
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return the default (false) until the component has mounted on the client.
  // This ensures the server render and the initial client render are identical.
  return mounted ? isMobile : false;
}
