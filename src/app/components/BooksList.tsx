"use client"

import BookModal from "./BookModal"
import AddToReadingList from "./AddToReadingList"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import { renderCover, renderAuthors } from "../utils/utils"
import { fetchMoreBooks } from "../utils/utils"

export default function BooksList({ works: initialWorks, type, query }: { works: any[], type: string, query: string }) {
    const [works, setWorks] = useState<any[]>(initialWorks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef(null);

    // Infinite Scroll Logic
    const fetchMore = useCallback(async () => {
        setLoading(true);
        const newBooks = await fetchMoreBooks({ page, type, query });
        setWorks(prev => [...prev, ...newBooks]);
        setPage(prev => prev + 1);
        setLoading(false);
    }, [page]);

    // Infinite Scroll Invisible Div Listener
    useEffect(() => {
        if (type !== "saved") {
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && !loading) {
                    console.log("OBSERVING")
                    fetchMore();
                }
            }, { threshold: 1.0 });

            if (loaderRef.current) observer.observe(loaderRef.current);

            return () => {
                if (loaderRef.current) observer.unobserve(loaderRef.current);
            };
        }
    }, [fetchMore, loading]);

    return (
        <div className="mb-12" data-testid="books-list">
            <ul className="flex w-full sm:gap-10 gap-5 flex-wrap sm:justify-center justify-around px-6">
                {works.map((post: any, idx: number) => (
                    <li
                        key={post.key + idx} // idx añadido por si hay duplicados
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
                        <span>{post.first_publish_year}</span>
                        <span className="overflow-hidden flex whitespace-nowrap h-8 overflow-x-auto scrollbar-hide">
                            {renderAuthors(post, type)}
                        </span>
                        <div>
                            <AddToReadingList book={post} />
                        </div>
                    </li>
                ))}
                <li className="w-full text-center py-6 col-span-full mb-12">
                    {loading && <div className="flex w-full justify-center"><div className="loaderSpinner"></div></div>}
                </li>
                <li ref={loaderRef} className="w-full -translate-y-400"></li>
            </ul>

            {isModalOpen && selectedBook && (
                <BookModal book={selectedBook} type={type} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}
