import { useEffect, useState } from 'react'

import { onAuthStateChanged } from '@/lib/firebase/auth'
import { User } from 'firebase/auth'

export function useUser() {
  const [user, setUser] = useState<User | null>()
  const [loading, setLoading] = useState(false)

  // Listen for changes to the user session
  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, loading }
}
