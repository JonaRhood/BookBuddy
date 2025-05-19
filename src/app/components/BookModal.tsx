import Image from "next/image";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BookModal({ book, onClose }: { book: any; onClose: () => void }) {
    const pathname = usePathname();
    const searchPathname = pathname.endsWith('/search');
    console.log(searchPathname)

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
        <div className="fixed top-0 left-0 w-full h-[100svh] bg-white/0 z-1 flex justify-center items-center">
            <div className="bg-stone-100 rounded-xl px-10 gap-4 w-[800px] h-[450px] flex relative border-1 border-stone-400 shadow-2xl">
                <div className="w-[35%] flex justify-center items-center">
                    <div className="flex h-90 w-full shadow-lg relative">
                        <Image
                            src={searchPathname ? `/api/cover/${book.cover_i}` : `/api/cover/${book.cover_id}`}
                            alt={book.title}
                            fill
                            loading="eager"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>
                <div className="w-[65%] flex flex-col justify-center">
                    <div className="h-80 flex flex-col">
                        <span className="text-2xl text-orange-900 font-bold">{book.title}</span>
                        <span><strong>Publish year:</strong> {book.first_publish_year}</span>
                        {searchPathname
                            ?
                            <div>
                                <span className="mb-4"><strong>Author/s:</strong> {book.author_name.map((a: any) => a).join(', ')}</span>
                            </div>
                            :
                            <div>
                                <span className="mb-4"><strong>Author/s:</strong> {book.authors.map((a: any) => a.name).join(", ")}</span>
                                <p><strong>Subjects:</strong> {book.subject.slice(0, 20).join(", ")}</p>
                            </div>
                        }
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="mb-4 text-stone-600 absolute right-6 top-4 text-2xl hover:cursor-pointer hover:text-red-700"
                >
                    X
                </button>
            </div>
        </div>
    );
}
