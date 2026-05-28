import type { RouteRecord } from 'vite-react-ssg';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cuve from './pages/Cuve';
import Accessories from './pages/Accessories';
import AccessoryDetail from './pages/AccessoryDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Cookies from './pages/legal/Cookies';
import CookieSettings from './pages/legal/CookieSettings';
import NotFound from './pages/NotFound';
import { ciubareProducts } from './data/products';
import { accessories } from './data/accessories';
import { blogPosts } from './data/blog';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'ciubare', element: <Products /> },
      {
        path: 'ciubare/:slug',
        element: <ProductDetail />,
        // Prerender o pagină statică pentru fiecare produs.
        getStaticPaths: () => ciubareProducts.map((p) => `/ciubare/${p.slug}`),
      },
      { path: 'cuve-fibra-de-sticla', element: <Cuve /> },
      { path: 'accesorii', element: <Accessories /> },
      {
        path: 'accesorii/:slug',
        element: <AccessoryDetail />,
        getStaticPaths: () => accessories.map((a) => `/accesorii/${a.slug}`),
      },
      { path: 'despre-noi', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'blog', element: <Blog /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        getStaticPaths: () => blogPosts.map((p) => `/blog/${p.slug}`),
      },
      // Pagini legale (noindex, dar prerandate pentru robusteză + acces direct)
      { path: 'confidentialitate', element: <Privacy /> },
      { path: 'termeni', element: <Terms /> },
      { path: 'cookie', element: <Cookies /> },
      { path: 'setari-cookie', element: <CookieSettings /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
