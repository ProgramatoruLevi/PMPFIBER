import './index.css';
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App';

// ViteReactSSG configurează atât randarea statică (build), cât și hidratarea
// pe client. Fiecare rută din `routes` devine o pagină HTML prerandată.
export const createRoot = ViteReactSSG({ routes });
