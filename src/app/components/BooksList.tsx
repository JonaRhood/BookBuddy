"use client"

import BookModal from "./BookModal"
import AddToReadingList from "./AddToReadingList"
import Image from "next/image"
import { useState } from "react"
import { renderCover, renderAuthors } from "../utils/utils"

export default function BooksList({ works, type }: { works: any[], type: string }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);

    return (
        <div className="mb-12" data-testid="books-list">
            <ul className=" flex w-full sm:gap-10 gap-5 flex-wrap sm:justify-center justify-around px-6">
                {works.map((post: any, idx: number) => (
                    <li
                        key={post.key}
                        className="flex flex-col sm:w-50 w-40"
                    >
                        <div
                            className="divBooksImage sm:h-80 h-65 flex mb-2 shadow-lg bg-[#C3B29E]/30 relative"
                            onClick={() => {
                                setSelectedBook(post);
                                setIsModalOpen(true);
                            }}
                        >
                            <Image
                                src={renderCover(post, type)}
                                // src={`https://covers.openlibrary.org/b/id/${post.cover_id}-L.jpg`}
                                alt={`Cover from ${post.title} book`}
                                fill
                                loading="lazy"
                                decoding="async"
                                fetchPriority={idx < 15 ? "high" : "low"}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={(e) => e.currentTarget.className = "hidden"}
                            />
                        </div>
                        <span
                            className="text-lg text-orange-900 whitespace-nowrap overflow-x-auto scrollbar-hide hover:cursor-pointer"
                            onClick={() => {
                                setSelectedBook(post);
                                setIsModalOpen(true);
                            }}
                        >
                            <strong>{post.title}</strong>
                        </span>
                        <span>
                            {post.first_publish_year}
                        </span>
                        <span className="overflow-hidden flex whitespace-nowrap h-8 overflow-x-auto scrollbar-hide">
                            {renderAuthors(post, type)}
                        </span>
                        <div>
                            <AddToReadingList book={post} />
                        </div>
                    </li>
                ))}
            </ul>
            {isModalOpen && selectedBook && (
                <BookModal book={selectedBook} type={type} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}