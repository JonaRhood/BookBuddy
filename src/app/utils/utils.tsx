export const renderCover = (post: any, type: string) => {
    if (type === "home" && "cover_id" in post) {
        return `/api/cover/${post.cover_id}`
    }

    if ((type === "author" || type === "title") && "cover_i" in post) {
        return `/api/cover/${post.cover_i}`
    }

    if ((type === "saved") && "covers" in post) {
        return `/api/cover/${post.covers[0]}`
    }

    return "./image-error.svg"
}

export const renderAuthors = (post: any, type: string) => {
    if (type === "home" && "authors" in post) {
        return post.authors.map((author: any) => (
            <div key={author.key}>{post.authors.map((a: any) => a.name).join(", ")}</div>
        ))
    }

    if (type === "author" || type === "title") {
        return <span>{post.author_name.join(", ")}</span>
    }

    if (type === "saved") {
        return;
    }

    return <span>No authors available</span>
}

export const renderDetailsModal = (book: any, type: string) => {
    if (type === "home" && "authors" in book) {
        return (
            <div>
                <p className="mb-4"><strong>Author/s:</strong> {book.authors.map((a: any) => a.name).join(", ")}</p>
                <p><strong>Subjects:</strong> {book.subject.slice(0, 20).join(", ")}</p>
            </div>
        )
    }

    if (type === "author" || type === "title") {
        return <span className="mb-4"><strong>Author/s:</strong> {book.author_name.map((a: any) => a).join(', ')}</span>
    }

    if (type === "saved") {
        if (book.description && typeof book.description === "object" && "value" in book.description) {
            return <span className="mb-4"><strong>Description:</strong> {book.description.value}</span>
        } else {
            return <span className="mb-4"><strong>Description:</strong> {book.description}</span>
        }
    }

    return <span>No authors available</span>
}

export async function fetchMoreBooks({
    page,
    type,
    query,
}: {
    page: number
    type: string
    query?: string
}): Promise<any[]> {
    const offset = page * 48;

    try {
        if (type === "home") {
            const res = await fetch(`https://openlibrary.org/subjects/history.json?limit=48&offset=${offset}`);
            const data = await res.json();
            return data.works;
        }

        if ((type === "author" || type === "title") && query) {
            const res = await fetch(
                `https://openlibrary.org/search.json?${type}=${query}&sort=new&limit=48&offset=${offset}`
            );
            const { docs } = await res.json();
            return docs.filter((book: any) => book.cover_i); // solo libros con portada
        }

        return [];
    } catch (err) {
        console.error("Fetch error:", err);
        return [];
    }
}
