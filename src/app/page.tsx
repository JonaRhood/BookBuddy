import BooksList from "./components/BooksList";

export default async function Home() {
  const res = await fetch('https://openlibrary.org/subjects/history.json?limit=48');
  const { works } = await res.json();
  
  console.log(works);

  return (
    <div>
      <BooksList works={works} type="home" />
    </div>
  );
}
