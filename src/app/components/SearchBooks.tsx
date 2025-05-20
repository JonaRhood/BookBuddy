"use client"

import { useState, useRef } from "react"
import SearchIcon from "../utils/icons/SearchIcon"
import XIcon from "../utils/icons/XIcon"
import BooksList from "./BooksList"

export default function SearchBooks() {
    const [searchType, setSearchType] = useState<"author" | "title">("author")
    const [query, setQuery] = useState("")
    const [books, setBooks] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        inputRef.current?.blur();
        const trimmed = query.trim()
        if (!trimmed) {
            setError("Please enter a search term.")
            setBooks([])
            return
        }

        setError(null)

        try {
            setIsLoading(true)
            const res = await fetch(
                `https://openlibrary.org/search.json?${searchType}=${trimmed}&sort=new&limit=100`
            )
            const { docs } = await res.json()
            const withCovers = docs.filter((book: any) => book.cover_i)

            if (withCovers.length === 0) {
                setError("No results found for your search.")
                setBooks([])
            } else {
                setBooks(withCovers)
                setError(null)
            }

            setIsLoading(false)
        } catch {
            setError("Something went wrong. Please try again.")
        }
    }

    const handleClear = () => {
        setQuery("")
        setBooks([])
        setError(null)
        inputRef.current?.focus()
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearch()
    }

    return (
        <div className="flex flex-col h-full">
            <div className="fixed top-[57px] w-full z-30 bg-[#b4a491]/50">
                <form
                    onSubmit={handleSubmit}
                    className="flex justify-center h-[67px] flex-col items-center relative"
                    data-testid="form-search"
                >
                    <div className="divSearchIconParent relative w-[700px]">
                        <div className="divSearchIcon flex border border-stone-400 rounded-full bg-stone-100/90 justify-center hover:bg-stone-100">
                            <select
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value as "author" | "title")}
                                className="rounded-l-full bg-stone-200 text-sm px-2 border-r border-stone-400 focus:outline-none"
                                data-testid="select-search"
                            >
                                <option value="author">Author</option>
                                <option value="title">Title</option>
                            </select>

                            <div className="items-center flex h-full px-1">
                                <div
                                    className="flex h-[34px] cursor-pointer p-[4px]"
                                    onClick={(e) => {
                                        handleSubmit(e);
                                        inputRef.current?.focus();
                                    }}
                                >
                                    <SearchIcon />
                                </div>
                            </div>

                            <input
                                ref={inputRef}
                                className="w-[92%] p-1 focus:outline-none bg-transparent"
                                placeholder={`Search book by ${searchType}`}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                data-testid="input-search"
                            />

                            <div className="flex h-full items-center pr-2">
                                {query && (
                                    <div
                                        className="xIcon flex justify-center h-[34px] p-[2px] mr-1 w-[20px] cursor-pointer"
                                        onClick={handleClear}
                                    >
                                        <XIcon />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-0 w-full translate-y-8 flex text-center">
                        {error && (
                            <p
                                className="text-red-700 bg-[#cec3b6] p-2 w-full text-sm mt-1"
                                data-testid="error-search"
                            >
                                {error}
                            </p>
                        )}
                        {!error && <div className="h-[20px]"></div>}
                    </div>
                </form>
            </div>

            <div className="mt-10">
                {!isLoading ? (
                    <BooksList works={books} type="author" />
                ) : (
                    <div className="flex justify-center">
                        <p className="text-gray-600 mt-4 w-full text-center loaderSpinner"></p>
                    </div>
                )}
            </div>
        </div>
    )
}
