// app/api/cover/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const coverUrl = `https://covers.openlibrary.org/b/id/${id}-L.jpg`;
    const res = await fetch(coverUrl);

    if (!res.ok) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const imageBuffer = await res.arrayBuffer();

    const response = new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

    return response;
  } catch (err) {
    return new NextResponse('Error fetching image', { status: 500 });
  }
}
