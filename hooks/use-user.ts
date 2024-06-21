import { useEffect, useState } from 'react'

import { onAuthStateChanged } from '@/lib/firebase/auth'
import { User } from 'firebase/auth'

export function useUser() {
  const [user, setUser] = useState<User | null>()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  // Listen for changes to the user session
  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser)
        if (authUser.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
          setIsAdmin(true)
        }
      } else {
        setUser(null)
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, loading, isAdmin }
}
