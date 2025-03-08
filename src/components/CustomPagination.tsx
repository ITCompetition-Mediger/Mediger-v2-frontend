import * as React from 'react';
import Pagination from '@mui/material/Pagination';

interface BasicPaginationProps {
  count: number; // 총 페이지 수
  page: number; // 현재 페이지 번호
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const CustomPagination: React.FC<BasicPaginationProps> = ({ count, page, onChange }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      sx={{
        '& .MuiPaginationItem-root': {
          color: '#B3B3B3', // 기본 글자 색상
          borderRadius: '20%',
          '&:hover': {
            backgroundColor: '#F3F3F3', // hover 시 배경색
          },
        },
        '& .Mui-selected': {
          backgroundColor: '#CCF7F0', // 선택된 페이지 번호 배경색
          color: '#00D1B2', // 선택된 페이지 번호 글자 색상
        },
        '& .MuiPaginationItem-icon': {
          fill: '#B3B3B3', // 화살표 색상
        },
      }}
    />
  );
};

export default CustomPagination;
