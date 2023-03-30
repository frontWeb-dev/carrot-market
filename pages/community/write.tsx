import type { NextPage } from 'next';
import { Layout, TextArea, Button } from '@components';

const Write: NextPage = () => {
  return (
    <Layout path='/community' title='Write Post'>
      <form className='space-y-4 p-4'>
        <TextArea required placeholder='Ask a question!' />
        <Button text='Submit' />
      </form>
    </Layout>
  );
};

export default Write;
