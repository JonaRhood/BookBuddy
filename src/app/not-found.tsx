import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <h1 className='sm:text-[2rem] text-stone-600 text-center text-[1.3rem]'>404 - Page Not Found</h1>
      <p className='text-center'>Sorry, we couldn’t find the page you were looking for.</p>
      <Link href="/" className='text-blue-700 underline text-center'>
          Go back to the homepage
      </Link>
    </div>
  )
}
