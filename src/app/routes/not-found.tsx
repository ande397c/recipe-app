import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { PATHS } from '@/config/paths';

export const NotFoundRoute = () => (
  <MainLayout title='Siden findes ikke'>
    <p>Vi kunne ikke finde den side, du leder efter.</p>
    <Link to={PATHS.app.recipes.getHref()} className='text-amber-600 underline'>
      Gå til opskrifter
    </Link>
  </MainLayout>
);
