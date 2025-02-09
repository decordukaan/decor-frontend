import React from 'react';
import { Pagination } from '@mantine/core';

interface MainPaginationProps {
  total?: number;
  page?: number;
  onChange?: (page: number) => void;
}

const MainPagination: React.FC<MainPaginationProps> = ({
  total = 1,
  page = 1,
  onChange = () => {},
}) => {
  return (
    <Pagination
      total={total}
      value={page}
      onChange={onChange}
      size="md"
      radius="md"
    />
  );
};

export default MainPagination;