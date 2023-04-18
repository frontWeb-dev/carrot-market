import { Layout } from '@components';
import matter from 'gray-matter';
import { link, readFileSync, readdirSync } from 'fs';
import { NextPage } from 'next';
import Link from 'next/link';

interface BlogProps {
  title: string;
  date: string;
  category: string;
  slug: string;
}
const Blog: NextPage<{ posts: BlogProps[] }> = ({ posts }) => {
  return (
    <Layout title='blog' seoTitle='Blog'>
      <h1 className='text-lg font-bold'>Latest Posts</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <Link href={`/blog/${post.category}/${post.slug}`}>
            <p>{post.title}</p>
            <p>{post.date}</p>
            <p>{post.category}</p>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  const blogPost = readdirSync('./posts').map((file) => {
    const content = readFileSync(`./posts/${file}`, 'utf-8');

    const [slug, _] = file.split('.');
    return { ...matter(content).data, slug };
  });

  return {
    props: {
      posts: blogPost,
    },
  };
}

export default Blog;
