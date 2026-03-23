import { createBrowserRouter, Outlet } from 'react-router-dom';
import { HomePage } from "@/pages/home/ui/HomePage";
import { Header } from '@/widgets/header';
import { CartPage } from "@/pages/cart/ui/CartPage";
import { ProductPage } from "@/pages/product-details/ui/ProductPage";

const RootLayout = () => (
    <div className="min-h-screen bg-white text-black dark:text-white transition-colors duration-300">
        <Header />
        <main className="container mx-auto py-8">
            <Outlet />
        </main>
    </div>
);


export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/cart',
                element: <CartPage />,
            },
            {
                path: '/product/:id',
                element: <ProductPage />,
            },
            {
                path: '*',
                element: <div>Страница не найдена</div>,
            },
        ],
    },
]);