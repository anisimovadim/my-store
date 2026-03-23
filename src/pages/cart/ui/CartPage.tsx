import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/entities/cart/model/store';
import { Link } from 'react-router-dom';

export const CartPage = () => {
    const { items, updateQuantity, removeProduct, getTotalPrice } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="h-10 w-10 text-gray-300" />
                </div>
                <h2 className="text-3xl font-black text-zinc-900 mb-2">Корзина пуста</h2>
                <p className="text-gray-500 mb-10 leading-relaxed">
                    Похоже, вы еще ничего не выбрали. <br /> Исправьте это в нашем каталоге!
                </p>
                <Link to="/" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-zinc-200">
                    <ArrowLeft size={18} /> К покупкам
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-black text-zinc-950 mb-10 tracking-tight">Корзина</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-28 w-28 flex-shrink-0 bg-gray-50 rounded-2xl p-4 flex items-center justify-center">
                                <img src={item.image} alt={item.title} className="max-h-full object-contain" />
                            </div>

                            <div className="flex-1 min-w-0 text-center sm:text-left">
                                <h3 className="font-bold text-lg text-gray-900 truncate mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-2">{item.category}</p>
                                <p className="text-xl font-black text-zinc-950">${item.price}</p>
                            </div>

                            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl">
                                <button
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-zinc-900 hover:text-white transition-all disabled:opacity-30"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-6 text-center font-black text-lg">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-zinc-900 hover:text-white transition-all"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            <button
                                onClick={() => removeProduct(item.id)}
                                className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                            >
                                <Trash2 className="h-6 w-6" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-zinc-950 text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-24">
                        <h2 className="text-2xl font-bold mb-8">Детали заказа</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-zinc-400 font-medium">
                                <span>Товары ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
                                <span className="text-white">${getTotalPrice().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-zinc-400 font-medium">
                                <span>Доставка</span>
                                <span className="text-green-400">Бесплатно</span>
                            </div>
                            <div className="h-px bg-zinc-800 my-6" />
                            <div className="flex justify-between items-end">
                                <span className="text-zinc-400 font-medium">Итого к оплате</span>
                                <span className="text-3xl font-black leading-none">${getTotalPrice().toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20">
                            Оформить заказ
                        </button>

                        <p className="text-center text-zinc-500 text-xs mt-6 px-4">
                            Нажимая кнопку, вы соглашаетесь с условиями доставки и возврата.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};