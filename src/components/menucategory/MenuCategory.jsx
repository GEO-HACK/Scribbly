import React from 'react'
import Link from 'next/link'

const MenuCategory = () => {
  return (
    <div className="flex flex-wrap gap-2 mt-3 mb-3">
    <Link href="/blog?cat=" className="text-sm bg-pink-200 p-2 rounded-lg">
      Coding
    </Link>
    <Link
      href="/blog?cat="
      className="text-sm bg-yellow-200 p-2 rounded-lg"
    >
      Food
    </Link>
    <Link href="/blog?cat=" className="text-sm bg-blue-200 p-2 rounded-lg">
      Style
    </Link>
    <Link
      href="/blog?cat="
      className="text-sm bg-violet-200 p-2 rounded-lg"
    >
      Fashion
    </Link>
    <Link href="/blog?cat=" className="text-sm bg-green-200 p-2 rounded-lg">
      Travel
    </Link>
    <Link href="/blog?cat=" className="text-sm bg-red-200 p-2 rounded-lg">
      Culture
    </Link>
  </div>
  )
}

export default MenuCategory