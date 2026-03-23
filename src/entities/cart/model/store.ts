import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/entities/product/model/types';

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addProduct: (product: Product) => void;
    removeProduct: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addProduct: (product) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }] });
                }
            },

            removeProduct: (productId) => {
                set({ items: get().items.filter((item) => item.id !== productId) });
            },

            updateQuantity: (productId, quantity) => {
                set({
                    items: get().items.map((item) =>
                        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                });
            },

            clearCart: () => set({ items: [] }),

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);