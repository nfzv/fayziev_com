import Link from 'next/link';
import React from 'react';

interface TagProps {
  label: string;
  selectedTag: string | null;
}

const Tag = ({ label, selectedTag }: TagProps) => {
  return (
    <Link
      key={label}
      href={`/blog${label === 'all' ? '' : `?tag=${label}`}`}
    >
      <span className={`${selectedTag === label ? 'underline' : ''} inline-flex whitespace-nowrap rounded-sm border border-slate-200 bg-slate-100 p-1 text-sm font-semibold lowercase hover:border-slate-300 hover:bg-slate-200`}>
        {label}
      </span>
    </Link>
  );
};

export default Tag;