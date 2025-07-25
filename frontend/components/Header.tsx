"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-card shadow-sm border-b">
      <nav className="container flex justify-between items-center py-4 px-8">
        <Link href="/" className="text-xl font-semibold text-primary">
                 Water Tracker
        </Link>
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <Link
              href="/"
              className={`hover:text-primary transition ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/log"
              className={`hover:text-primary transition ${
                pathname === "/log" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Log
            </Link>
          </li>
          <li>
            <Link
              href="/summary"
              className={`hover:text-primary transition ${
                pathname === "/summary" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Summary
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
