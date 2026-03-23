import { ProductList } from '@/widgets/product-list/ui/ProductList';

export const HomePage = () => {
    return (
        <div className="px-4">
            <h1 className="text-4xl font-black text-zinc-950 mb-10 tracking-tight">
                Наши товары 🛍️
            </h1>
            <ProductList />
        </div>
    );
};