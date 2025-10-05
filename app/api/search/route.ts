// app/api/search/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get('query') ?? '').trim();
  const type = url.searchParams.get('type') ?? 'all'; // 'all' | 'user' | 'post'
  const sort = url.searchParams.get('sort') ?? 'newest'; // newest | oldest | likes | comments
  const order = (url.searchParams.get('order') ?? 'desc').toLowerCase() as 'asc' | 'desc';
  const fileType = url.searchParams.get('fileType') ?? undefined;
  const limit = Math.min(50, Number(url.searchParams.get('limit') ?? 20));

  // Helper: build post where
  const postWhere: any = {};
  if (q) {
    postWhere.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { content: { contains: q, mode: 'insensitive' } },
      { '#': { contains: q } } // placeholder — adapt if you store file metadata
    ];
  }

  if (fileType) {
    postWhere.fileType = fileType;
  }

  // build orderBy
  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'newest') orderBy = { createdAt: 'desc' };
  else if (sort === 'oldest') orderBy = { createdAt: 'asc' };
  else if (sort === 'likes') orderBy = { likesCount: order };
  else if (sort === 'comments') orderBy = { commentsCount: order };

  // Execute queries in parallel
  const promises: Promise<any>[] = [];

  if (type === 'all' || type === 'user') {
    const userPromise = prisma.user.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { username: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {},
      take: 6,
      select: { id: true, name: true, username: true, image: true },
    });
    promises.push(userPromise);
  } else {
    promises.push(Promise.resolve([]));
  }

  if (type === 'all' || type === 'post') {
    const postPromise = prisma.post.findMany({
      where: postWhere,
      orderBy,
      take: limit,
      include: {
        author: { select: { id: true, name: true, username: true, image: true } },
      },
    });
    promises.push(postPromise);
  } else {
    promises.push(Promise.resolve([]));
  }

  const [users, posts] = (await Promise.all(promises)) as [any[], any[]];

  return NextResponse.json({ users, posts });
}
