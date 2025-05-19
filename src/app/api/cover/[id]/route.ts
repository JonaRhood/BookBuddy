import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: any) {
  const id = params.id;

  try {
    const coverUrl = `https://covers.openlibrary.org/b/id/${id}-L.jpg`;
    const res = await fetch(coverUrl);

    if (!res.ok) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const imageBuffer = await res.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    return new NextResponse('Error fetching image', { status: 500 });
  }
}
