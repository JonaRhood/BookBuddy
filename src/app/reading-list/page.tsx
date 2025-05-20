"use client"

import { useEffect, useState } from "react"
import BooksList from "../components/BooksList"

export default function ReadingListPage() {
    const [savedBooks, setSavedBooks] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
            setIsLoading(false);
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
            {!isLoading ? (
                <BooksList works={savedBooks} type="saved" query={""} />
            ) : (
                <div className="flex justify-center">
                    <p className="text-gray-600 w-full text-center loaderSpinner"></p>
                </div>
            )}
            {savedBooks.length <= 0 && !isLoading &&
                <p className="text-gray-600 w-full text-center -translate-y-12 px-4">No saved books found. You can save books to access them later.</p>
            }
        </div>
    )
}
