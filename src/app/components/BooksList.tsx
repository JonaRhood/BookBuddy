"use client"

import BookModal from "./BookModal"
import Image from "next/image"
import { useState } from "react"

export default function BooksList({ works }: { works: any[] }) {
    console.log(works)

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
                            className="divBooksImage h-80 flex mb-2 shadow-lg bg-[#C3B29E]/30"
                            onClick={() => {
                                setSelectedBook(post);
                                setIsModalOpen(true);
                            }}

                        >
                            <Image
                                src={`/api/cover/${post.cover_id}`}
                                alt={`Cover from ${post.title} book`}
                                width={200}
                                height={200}
                                loading="lazy"
                                decoding="async"
                                fetchPriority={idx < 15 ? "high" : "low"}
                            />
                        </div>
                        <span className="text-lg text-orange-900 whitespace-nowrap overflow-x-auto scrollbar-hide">
                            <strong>{post.title}</strong>
                        </span>
                        <span>
                            {post.first_publish_year}
                        </span>
                        <span className="overflow-hidden flex whitespace-nowrap h-8 overflow-x-auto scrollbar-hide">
                            {post.authors.map((author: any) => (
                                <div key={author.key}>
                                    {author.name}
                                </div>
                            ))}
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