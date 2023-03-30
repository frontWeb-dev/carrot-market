import type { NextPage } from 'next';
import { Layout, Message, ChatInput } from '@components';

const ChatDetail: NextPage = () => {
  return (
    <Layout path='/chats' title='Steve'>
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
