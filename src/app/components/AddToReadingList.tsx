import { useEffect, useState } from "react"

export default function AddToReadingList({ book }: { book: any }) {
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem("BooksSaved") || "[]") as string[]
        setIsSaved(savedBooks.includes(book.key))
    }, [book.key])

    const toggleBookInReadingList = (bookToToggle: any) => {
        const savedBooks = JSON.parse(localStorage.getItem("BooksSaved") || "[]") as string[]
        const bookIndex = savedBooks.indexOf(bookToToggle.key)

        if (bookIndex === -1) {
            savedBooks.push(bookToToggle.key)
            setIsSaved(true)
        } else {
            savedBooks.splice(bookIndex, 1)
            setIsSaved(false)
        }

        localStorage.setItem("BooksSaved", JSON.stringify(savedBooks))
        window.dispatchEvent(new Event("readingListUpdated"))
    }

    return (
        <div className="flex">
            <div
                className={isSaved ? "divReadingListSaved" : "divReadingList"}
                onClick={() => toggleBookInReadingList(book)}
            >
                {isSaved ? "Saved" : "Add to list"}
            </div>
        </div>
    )
}
