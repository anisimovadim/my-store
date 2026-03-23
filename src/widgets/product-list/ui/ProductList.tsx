import { useState, useMemo } from 'react';
import { useGetProducts, useGetCategories } from '@/entities/product/api/productApi';
import { useCartStore } from '@/entities/cart/model/store';
import { ProductSkeleton } from '@/entities/product/ui/ProductSkeleton';
import { Link } from 'react-router-dom';
import { Search, PackageSearch, ChevronDown } from 'lucide-react';

export const ProductList = () => {
    const { data: products, isLoading: isProductsLoading, error } = useGetProducts();
    const { data: categories, isLoading: isCatsLoading } = useGetCategories();
    const addProduct = useCartStore((state) => state.addProduct);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high'

    const filteredAndSortedProducts = useMemo(() => {
        if (!products) return [];

        let result = products.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, searchQuery, selectedCategory, sortBy]);

    if (isProductsLoading || isCatsLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
                {[...Array(8)].map((_, index) => <ProductSkeleton key={index} />)}
            </div>
        );
    }

    if (error) return <div className="p-4 text-red-500 text-center">Ошибка загрузки.</div>;

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="flex flex-col gap-6 mb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Поиск */}
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Найти в магазине..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full md:w-auto">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full md:w-auto appearance-none pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-2xl outline-none cursor-pointer focus:ring-2 focus:ring-black shadow-sm font-medium"
                        >
                            <option value="default">По умолчанию</option>
                            <option value="price-low">Сначала дешевые</option>
                            <option value="price-high">Сначала дорогие</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                </div>

                {/* Категории */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            selectedCategory === 'all'
                                ? 'bg-black text-white'
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        Все
                    </button>
                    {categories?.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                                selectedCategory === cat
                                    ? 'bg-black text-white'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50 rounded-3xl border-2 border-dashed">
                    <PackageSearch size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">К сожалению, таких товаров нет</p>
                    <button
                        onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
                        className="mt-4 text-blue-600 font-bold hover:underline"
                    >
                        Сбросить фильтры
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredAndSortedProducts.map((product) => (
                        <div key={product.id} className="flex flex-col group h-full">
                            <Link to={`/product/${product.id}`} className="block mb-4 flex-grow">
                                <div className="aspect-[4/5] bg-white border border-gray-100 rounded-[2rem] p-8 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-gray-200 group-hover:-translate-y-1">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="mt-4 px-2">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">{product.category}</p>
                                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                                        {product.title}
                                    </h3>
                                </div>
                            </Link>
                            <div className="mt-auto px-2 pb-2 flex items-center justify-between">
                                <span className="text-xl font-black text-gray-900">${product.price}</span>
                                <button
                                    onClick={() => addProduct(product)}
                                    className="bg-zinc-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all shadow-lg active:scale-90"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};