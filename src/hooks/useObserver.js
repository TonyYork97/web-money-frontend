import React, { useRef } from 'react'
export const useObserver = (
  ref,
  canLoad,
  isLoading,
  callback,
  full,
  isLoadingAuth,
  error
) => {
  const observer = useRef()
  React.useEffect(() => {
    if (!full) return
    if (isLoadingAuth) return
    if (isLoading) return
    if (error) return
    if (observer.current) observer.current.disconnect()

    let cb = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback()
      }
    }
    observer.current = new IntersectionObserver(cb, {
      rootMargin: '80px 0px 0px',
    })
    observer.current.observe(ref.current)
  }, [isLoading])
}
