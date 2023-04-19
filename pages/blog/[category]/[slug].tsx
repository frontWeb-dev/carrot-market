import { GetStaticProps, NextPage } from 'next/types';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse/lib';
import remarkHtml from 'remark-html';
import { Layout } from '@components';
import { useRouter } from 'next/router';

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Layout title='Loading' seoTitle='Loading'>
        <h1>Loading</h1>
      </Layout>
    );
  }
  return (
    <Layout seoTitle={data.title} title={data.title} path='/blog'>
      <div className='blog-post-content ' dangerouslySetInnerHTML={{ __html: post }}></div>
    </Layout>
  );
};

//  페이지에서 동적인 URL을 갖는 페이지에서 getStaticProps를 사용할 때 필요
export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content, data } = matter.read(`./posts/${ctx?.params?.slug}.md`);
  const { value } = await unified().use(remarkParse).use(remarkHtml).process(content);

  return {
    props: {
      data,
      post: value,
    },
  };
};

export default Post;
