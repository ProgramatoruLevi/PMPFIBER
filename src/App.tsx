import type { RouteRecord } from 'vite-react-ssg';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cuve from './pages/Cuve';
import Accessories from './pages/Accessories';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import { ciubareProducts } from './data/products';
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
      { path: 'despre-noi', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'blog', element: <Blog /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        getStaticPaths: () => blogPosts.map((p) => `/blog/${p.slug}`),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];
