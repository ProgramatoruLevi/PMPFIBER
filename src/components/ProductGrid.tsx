import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { Product } from '../data/products';

interface Props {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({ products, columns = 3 }: Props) {
  const cols =
    columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : columns === 2
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-ink-800/40 py-20 text-center text-sand">
        Nu am găsit produse pentru acest filtru.
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${cols}`}>
      {products.map((p, i) => (
        <motion.div
          key={p.slug}
          layout
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
        >
          <ProductCard product={p} index={i} />
        </motion.div>
      ))}
    </div>
  );
}
