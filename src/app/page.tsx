export default async function Home() {

  const res = await fetch('https://openlibrary.org/subjects/love.json?limit=48');
  const { works } = await res.json();
  
  console.log(works);

  return (
    <div>
      <ul className=" flex w-full gap-4 flex-wrap justify-between px-6">
        {works.map((post: any, idx: number) => (
          <li
            key={post.key}
            className="flex flex-col w-50 mb-4"
          >
            <div className="divBooksImage h-80 flex mb-2 shadow-lg bg-[#C3B29E]/30">
              <img
                src={`https://covers.openlibrary.org/b/id/${post.cover_id}-L.jpg`}
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
    </div>
  );
}
