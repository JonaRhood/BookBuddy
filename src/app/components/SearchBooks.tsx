// app/components/SearchPatients.tsx
"use client"

import { useState, useEffect, useRef } from "react";
import SearchIcon from "../utils/icons/SearchIcon";
import XIcon from "../utils/icons/XIcon";
import BooksList from "./BooksList";

export default function SearchBooks() {
    const [searchType, setSearchType] = useState<"author" | "title">("author");
    const [inputValue, setInputValue] = useState<any[]>([]);
    const [iconXOn, setIconXOn] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log(searchType)
    }, [searchType])

    const fetchData = async (value: string) => {
        const res = await fetch(`https://openlibrary.org/search.json?${searchType}=${value}&sort=new&limit=100`);
        const { docs } = await res.json();
        const booksWithCover = docs.filter((book: any) => book.cover_i);
        setInputValue(booksWithCover);
    };


    const inputSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        if (e.key === "Enter") {
            e.preventDefault();
            inputRef.current?.blur();
            if (value.length === 0) {
                console.log(value)
                setInputValue([]);
                return;
            } else {
                fetchData(value)
                return;
            }
        }
        if (e.key === "Backspace" && value.length <= 1) {
            setIconXOn(false);
        } else {
            setIconXOn(true);
        }
    }

    const handleXIcon = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.blur();
        }
        setIconXOn(false);
        setInputValue([]);
    }

    return (
        <div className="flex flex-col h-full">
            <div className="sticky top-[57px] w-full z-30 bg-[#b4a491]/50">
                <div className="flex justify-center h-[67px] items-center relative">
                    <div className="divSearchIcon flex border-1 border-stone-400 rounded-full w-[50%] bg-stone-100/90 justify-center hover:bg-stone-100">
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value as "author" | "title")}
                            className="rounded-l-full bg-stone-200 text-sm px-2 border-r border-stone-400 focus:outline-none"
                        >
                            <option value="author">Author</option>
                            <option value="title">Title</option>
                        </select>

                        <div className="items-center flex h-full">
                            <div className=" py-1 flex h-[34px]">
                                <SearchIcon onClick={() => inputRef.current?.focus()} />
                            </div>
                        </div>
                        <input
                            ref={inputRef}
                            className="w-[92%] p-1 focus:outline-none"
                            placeholder={`Search book by ${searchType === "author" ? "Author" : "Title"}`}
                            onKeyDown={(e) => inputSearch(e)}
                        ></input>
                        <div className="flex h-full items-center">
                            <div className="flex justify-center h-[34px] w-[50px] hover:cursor-text">
                                <div
                                    className={`xIcon ${iconXOn ? 'flex' : 'hidden'} w-[20px] py-2`}
                                    onClick={() => handleXIcon()}
                                >
                                    <XIcon onClick={() => inputRef.current?.focus()} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <BooksList works={inputValue} type={searchType} />
            </div>
        </div>
    )
}