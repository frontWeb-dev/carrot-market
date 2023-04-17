import { joinClassName } from '@libs/client/utils';
import React, { useState } from 'react';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ totalCount, currentPage, setCurrentPage }: PaginationProps) => {
  const pageCount = 5;
  const totalPage = Math.ceil(totalCount / 10);
  const pageGroup = Math.ceil(currentPage / pageCount);
  let lastNum = pageGroup * pageCount;
  if (lastNum > totalPage) lastNum = totalPage;
  let firstNum = lastNum - (pageCount - 1);
  if (lastNum < pageCount) firstNum = lastNum - (lastNum - 1);

  const prevPage = () => {
    setCurrentPage(firstNum - 1);
  };
  const nextPage = () => {
    setCurrentPage(lastNum + 1);
  };

  const movePage = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    setCurrentPage(+target.innerText);
  };

  return (
    <div className='relative z-50 flex w-[80%] justify-center space-x-4 pl-4'>
      {firstNum - 1 > 0 && <button onClick={prevPage}>이전</button>}

      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          onClick={movePage}
          className={joinClassName(
            'rounded-sm py-2 px-3',
            +currentPage === firstNum + i ? 'bg-blue-100' : 'cursor-pointer'
          )}>
          {firstNum + i}
        </button>
      ))}

      {lastNum < totalPage && <button onClick={nextPage}>다음</button>}
    </div>
  );
};

export default Pagination;
