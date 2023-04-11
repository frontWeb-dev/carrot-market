import { useEffect } from 'react';
import { User } from '@prisma/client';
import useUser from '@libs/client/useUser';

interface AuthProps {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  children: React.ReactNode;
}

const Auth = ({ children, setUser }: AuthProps) => {
  const { user: data } = useUser();

  useEffect(() => {
    if (data) setUser(data);
  }, [data, setUser]);

  return <div className='mx-auto  w-full max-w-md'>{children}</div>;
};

export default Auth;
