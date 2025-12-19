import { faList, faPlus, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  variant?: 'add' | 'recipe' | 'groceryList';
  isDense?: boolean;
  title: string;
  img?: string;
  id?: number;
  onClick?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  variant = 'recipe',
  isDense,
  title,
  img,
  id,
  onClick
}) => {
  const isCreateVariant = variant === 'add';
  const isRecipeVariant = variant === 'recipe';
  const redirectUrl = isRecipeVariant ? `/recipes/${id}` : `/grocery-lists/${id}`;

  return (
    <li
      className={clsx(
        'w-full overflow-hidden cursor-pointer',
        isDense ? 'flex flex-row items-center gap-3' : 'flex flex-col'
      )}
      onClick={onClick}
    >
      <Link
        to={isCreateVariant ? '#' : redirectUrl}
        className={clsx(
          'relative flex-shrink-0 bg-stone-200 rounded-sm',
          isDense ? 'w-16 h-16' : 'w-full aspect-[4/3]',
          !isCreateVariant && 'overflow-hidden',
          isCreateVariant && 'flex items-center justify-center'
        )}
      >
        {isCreateVariant ? (
          <FontAwesomeIcon icon={faPlus} size='xl' />
        ) : (
          <CardImage img={img} alt={title} isRecipeVariant={isRecipeVariant} />
        )}
      </Link>

      <p className={clsx('px-2 text-sm font-medium', !isDense && 'py-2 text-center')}>{title}</p>
    </li>
  );
};

interface CardImageProps {
  img?: string;
  alt: string;
  isRecipeVariant?: boolean;
}

const CardImage: React.FC<CardImageProps> = ({ img, alt, isRecipeVariant }) => {
  const icon = isRecipeVariant ? faUtensils : faList;

  if (!img) {
    return (
      <div className='w-full h-full bg-stone-200 flex items-center justify-center'>
        <FontAwesomeIcon icon={icon} size='xl' />
      </div>
    );
  }

  return <img src={img} alt={alt} className='w-full h-full object-cover' />;
};
