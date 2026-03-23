import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCartStore } from '@/entities/cart/model/store';

export const Header = () => {
    const totalItems = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                    <Store className="h-6 w-6 text-blue-600" />
                    <span>MyStore</span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium hover:text-blue-600 transition">
                        Каталог
                    </Link>

                    <Link to="/cart" className="relative group">
                        <ShoppingCart className="h-6 w-6 group-hover:text-blue-600 transition" />

                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white animate-in zoom-in">
                {totalItems}
              </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
};