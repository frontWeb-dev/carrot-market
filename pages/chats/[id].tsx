import type { NextPage } from 'next';
import Layout from '@components/layout';
import Message from '@components/message';
import ChatInput from '@components/chatInput';

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack title='Steve'>
      <div className='space-y-4 py-5 px-4 pb-16'>
        <Message message='Hi how much are you selling them for?' />
        <Message message='I want ￦20,000' reversed />
        <Message message='미쳤어' />
        <ChatInput />
      </div>
    </Layout>
  );
};

export default ChatDetail;
