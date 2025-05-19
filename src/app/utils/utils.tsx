export const renderCover = (post: any, type: string) => {
    if (type === "home" && "cover_id" in post) {
        return `/api/cover/${post.cover_id}`
    }

    if ((type === "author") && "cover_i" in post) {
        return `/api/cover/${post.cover_i}`
    }

    if ((type === "saved") && "covers" in post) {
        return `/api/cover/${post.covers[0]}`
    }

    return "./logo.svg"
}

export const renderAuthors = (post: any, type: string) => {
    if (type === "home" && "authors" in post) {
        return post.authors.map((author: any) => (
            <div key={author.key}>{post.authors.map((a: any) => a.name).join(", ")}</div>
        ))
    }

    if (type === "author" && "author_name" in post) {
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

    if (type === "author" && "author_name" in book) {
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