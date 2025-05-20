import Image from "next/image";
import { useEffect } from "react";
import { renderCover, renderDetailsModal } from "../utils/utils";

export default function BookModal({ book, type, onClose }: { book: any; type: string; onClose: () => void }) {
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="divModalParent fixed top-0 left-0 w-full h-screen bg-white/0 z-1 flex justify-center items-center">
            <div className="divModal bg-stone-100 rounded-xl px-10 gap-4 w-[800px] h-[450px] flex relative border-1 border-stone-400 shadow-2xl">
                <div className="divModalImageParent w-57 flex justify-center items-center">
                    <div className="divModalImage flex h-90 w-full shadow-lg relative bg-[#C3B29E]/30 ">
                        <Image
                            src={renderCover(book, type)}
                            alt={book.title}
                            fill
                            loading="eager"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={(e) => e.currentTarget.className = "hidden"}
                        />
                    </div>
                </div>
                <div className="w-[95%] sm:w-[65%] flex flex-col justify-center">
                    <div className="detailsDivParent h-80 flex flex-col">
                        <span className="text-2xl text-orange-900 font-bold">{book.title}</span>
                        {type !== "saved" &&
                            <span><strong>Publish year:</strong> {book.first_publish_year}</span>
                        }
                        <div className="detailsDiv h-full overflow-hidden overflow-y-auto">
                            {renderDetailsModal(book, type)}
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="xIconModal mb-4 text-stone-600 absolute right-6 top-4 text-2xl hover:cursor-pointer hover:text-red-700"
                >
                    X
                </button>
            </div>
        </div>
    );
}
