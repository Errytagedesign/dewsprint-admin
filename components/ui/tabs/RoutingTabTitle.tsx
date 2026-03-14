import { TabProps } from '@/types/global.types';

const RoutingTabTitle = ({
  id,
  title,
  activeTab,
  activeClass,
  notActiveClass,
  icon,
  className,
  count,
}: TabProps & { className?: string; count?: number }) => {
  return (
    <article
      className={
        activeTab === id || activeTab?.includes(id)
          ? activeClass
          : notActiveClass
      }
    >
      <span
        className={`${
          icon || count
            ? 'flex items-center justify-center gap-2'
            : 'text-center'
        } ${className}`}
      >
        {' '}
        {icon && <>{icon}</>} {title}
        {count && (
          <span className='hidden size-5 place-items-center rounded-full bg-[#2D674126] text-[10px] md:grid'>
            {count === 10 ? '9+' : count}
          </span>
        )}
      </span>
    </article>
  );
};

export default RoutingTabTitle;
