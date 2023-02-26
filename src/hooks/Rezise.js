import React from 'react'

export const useResize = () => {
  const [width, setWidth] = React.useState(window.innerWidth)
  React.useEffect(() => {
    const handleResize = (e) => {
      setWidth(e.target.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [width])

  return {
    width,
  }
}
