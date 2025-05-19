"use client"

import BookModal from "./BookModal"
import Image from "next/image"
import { useState } from "react"

export default function BooksList({ works, type }: { works: any[], type: string }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);

    return (
        <div>
            <ul className=" flex w-full gap-4 flex-wrap justify-between px-6">
                {works.map((post: any, idx: number) => (
                    <li
                        key={post.key}
                        className="flex flex-col w-50 mb-4"
                    >
                        <div
                            className="divBooksImage h-80 flex mb-2 shadow-lg bg-[#C3B29E]/30 relative"
                            onClick={() => {
                                setSelectedBook(post);
                                setIsModalOpen(true);
                            }}
                        >
                            <Image
                                src={type === "home" ? `/api/cover/${post.cover_id}` : `/api/cover/${post.cover_i}`}
                                // src={`https://covers.openlibrary.org/b/id/${post.cover_id}-L.jpg`}
                                alt={`Cover from ${post.title} book`}
                                fill
                                loading="lazy"
                                decoding="async"
                                fetchPriority={idx < 15 ? "high" : "low"}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <span className="text-lg text-orange-900 whitespace-nowrap overflow-x-auto scrollbar-hide">
                            <strong>{post.title}</strong>
                        </span>
                        <span>
                            {post.first_publish_year}
                        </span>
                        <span className="overflow-hidden flex whitespace-nowrap h-8 overflow-x-auto scrollbar-hide">
                            {type === "home"
                                ?
                                post.authors.map((author: any) => (
                                    <div key={author.key}>
                                        {author.name}
                                    </div>
                                ))
                                :
                                post.author_name.map((author: any) => author).join(', ')
                            }
                        </span>
                    </li>
                ))}
            </ul>
            {isModalOpen && selectedBook && (
                <BookModal book={selectedBook} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}