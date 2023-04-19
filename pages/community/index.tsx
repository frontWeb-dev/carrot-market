import type { NextPage } from 'next';
import Link from 'next/link';
import { Layout, FloatingButton } from '@components';
import useSWR from 'swr';
import { Post, User } from '@prisma/client';
import useCoords from '@libs/client/useCoords';
import client from '@libs/server/client';

interface PostsWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    wondering: number;
  };
}

interface PostsResponse {
  posts: PostsWithUser[];
}

const Community: NextPage<PostsResponse> = ({ posts }) => {
  // const { latitude, longitude } = useCoords();
  // const { data } = useSWR<PostsResponse>(
  //   latitude && longitude ? `/api/posts?latitude=${latitude}&longitude=${longitude}` : null
  // );

  const sortPosts = posts.sort((a, b) => b.id - a.id);
  console.log(sortPosts);

  return (
    <Layout title='동네 생활' seoTitle='Community' hasTabBar>
      <div className='space-y-8 py-5'>
        {sortPosts?.map((post) => (
          <Link key={post.id} href={`/community/${post.id}`}>
            <div className='mb-4 flex cursor-pointer flex-col items-start px-4'>
              <span className='flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600'>
                동네질문
              </span>

              <div className='mt-2 text-gray-700'>
                <span className='font-semibold text-orange-500'>Q.</span> {post.question}
              </div>
              <div className='mt-5 flex w-full items-center justify-between text-xs font-semibold text-gray-500'>
                <span>{post.user.name}</span>
                <span>{String(post.createAt)}</span>
              </div>
              <div className='mt-3 flex w-full space-x-5 border-b-[1.5px] border-t py-2.5 text-gray-700'>
                <span className='flex items-center space-x-2 text-sm'>
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                  </svg>
                  <span>궁금해요 {post._count?.wondering}</span>
                </span>
                <span className='flex items-center space-x-2 text-sm'>
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'></path>
                  </svg>
                  <span>답변 {post._count?.answers}</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
        <FloatingButton href='/community/write'>
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

// build 시 한번만 실행
export async function getStaticProps() {
  console.log('Build');
  const posts = await client.post.findMany({
    include: { user: true },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}

export default Community;
