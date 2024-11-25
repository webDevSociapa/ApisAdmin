import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../components/common/sidebar'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
        <p>Select an option from the sidebar to get started.</p>
      </main>
    </div>
  )
}

