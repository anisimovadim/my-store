import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetProductById } from '@/entities/product/api/productApi';
import { useCartStore } from '@/entities/cart/model/store';
import { Star, ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';

const getStarsArray = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
};

export const ProductPage = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    const { data: product, isLoading, isError } = useGetProductById(id!);
    const addProduct = useCartStore((state) => state.addProduct);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-10 h-10 animate-spin text-zinc-500" />
            </div>
        );
    }

    if (isError || !product) {
        return <div className="p-20 text-center text-red-500 font-bold">Товар не найден или произошла ошибка</div>;
    }

    const { rating } = product;

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-10">
            {/*<button*/}
            {/*    onClick={() => navigate(-1)}*/}
            {/*    className="flex items-center gap-2 mb-10 text-zinc-600 hover:text-black transition-colors"*/}
            {/*>*/}
            {/*    <ArrowLeft size={20} /> Назад к покупкам*/}
            {/*</button>*/}

            <div className="max-w-7xl mx-auto p-6 md:p-10">
                <nav className="flex items-center gap-2 mb-8 text-sm font-medium">
                    <Link to="/" className="text-zinc-400 hover:text-black transition-colors">
                        Главная
                    </Link>
                    <span className="text-zinc-300">/</span>
                    <span className="text-zinc-400 capitalize">{product.category}</span>
                    <span className="text-zinc-300">/</span>
                    <span className="text-zinc-900 truncate max-w-[200px]">{product.title}</span>
                </nav>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                <div className="bg-white p-10 rounded-3xl border shadow-sm flex items-center justify-center aspect-square">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[450px] object-contain"
                    />
                </div>

                <div className="flex flex-col">
                    <div className="mb-4">
                        <span className="text-sm text-blue-700 font-semibold uppercase tracking-wider">
                            {product.category}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-950 mb-4 leading-tight">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-100">
                        <div className="flex items-center gap-1">
                            {getStarsArray(rating.rate).map((filled, index) => (
                                <Star
                                    key={index}
                                    size={20}
                                    className={filled ? "fill-yellow-400 text-yellow-500" : "text-zinc-300"}
                                />
                            ))}
                        </div>

                        <span className="font-semibold text-lg text-zinc-900">
                            {rating.rate.toFixed(1)}
                        </span>
                        <span className="text-base text-zinc-500">
                            ({rating.count} отзывов)
                        </span>
                    </div>

                    <p className="text-lg text-zinc-700 leading-relaxed mb-10">
                        {product.description}
                    </p>

                    <div className="mt-auto pt-8 border-t border-zinc-100 flex items-center justify-between gap-6">
                        <span className="text-5xl font-extrabold text-zinc-950 tracking-tight">
                            ${product.price}
                        </span>

                        <button
                            onClick={() => addProduct(product)}
                            className="flex-1 max-w-[300px] h-16 bg-black text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-zinc-200"
                        >
                            <ShoppingCart size={22} />
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};