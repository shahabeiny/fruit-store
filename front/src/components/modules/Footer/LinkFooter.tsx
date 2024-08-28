import Link from 'next/link';
import { FC } from 'react';


type LinkFooterProps = {
  title: string;
  href?: string;
};

const LinkFooter: FC<LinkFooterProps> = ({ title, href = '#' }) => {
  return (
    <Link href={href} className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
      <span className="inline-block w-2 md:w-2.5 h-1 rounded-full bg-current"></span>
      {title}
    </Link>
  );
};

export default LinkFooter;
