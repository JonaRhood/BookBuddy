"use client"

import SearchIcon from "../utils/icons/SearchIcon"
import HeartIcon from "../utils/icons/HeartIcon"
import Link from "next/link"

export default function NavBar() {
    return (
        <div className="fixed bottom-5 right-8 flex gap-2 w-50 h-15 justify-end">
            <Link href={"/search"} className="searchIconLink">
                <div className="bg-stone-200/90 rounded-full border-4 border-stone-600/90 p-2">
                    <SearchIcon />
                </div>
            </Link>
            <Link href={"/reading-list"} className="heartIconLink">
                <div className="bg-stone-200/90 rounded-full border-4 border-stone-600/90 p-2">
                    <HeartIcon />
                </div>
            </Link>
        </div>
    )
}