'use client'
import { useState, useEffect } from 'react'

const ThemeToggle = () => {
  const savedTheme = localStorage?.getItem('theme') ?? null
  const [theme, setTheme] = useState<'light' | 'dark'>((savedTheme as 'light' | 'dark') ?? 'light')

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark')
    } else {
      setTheme(systemTheme)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</button>
  )
}

export default ThemeToggle
