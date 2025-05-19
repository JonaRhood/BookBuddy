"use client"

import { useEffect, useState } from "react"
import BooksList from "../components/BooksList"

export default function ReadingListPage() {
    const [savedBooks, setSavedBooks] = useState<any[]>([])

    useEffect(() => {
        const fetchSavedBooks = async () => {
            const storedKeys = JSON.parse(localStorage.getItem("BooksSaved") || "[]") as string[]
            const bookPromises = storedKeys.map(async (key) => {
                try {
                    const res = await fetch(`https://openlibrary.org${key}.json`)
                    if (!res.ok) throw new Error(`Error fetching book with key ${key}`)
                    const book = await res.json()
                    return book
                } catch (err) {
                    console.error(err)
                    return null
                }
            })

            const books = await Promise.all(bookPromises)
            setSavedBooks(books.filter(book => book !== null))
        }

        fetchSavedBooks()

        const handleUpdate = () => fetchSavedBooks()
        window.addEventListener("readingListUpdated", handleUpdate)

        return () => {
            window.removeEventListener("readingListUpdated", handleUpdate)
        }
    }, [])

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-6 w-full text-center">
                Your Reading List
            </h1>
            {savedBooks.length > 0 ? (
                <BooksList works={savedBooks} type="saved" />
            ) : (
                <p className="text-gray-600 w-full text-center">Loading...</p>
            )}
        </div>
    )
}
