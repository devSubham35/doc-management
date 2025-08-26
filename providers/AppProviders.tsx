import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/global/navbar/Navbar'

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <main>
        <Navbar />
        <div className='min-h-[calc(100vh-64px)]'>
          {children}
        </div>
      </main>
    </ThemeProvider>

  )
}

export default AppProviders
