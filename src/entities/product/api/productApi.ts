import { apiInstance } from '@/shared/api/base';
import { useQuery } from '@tanstack/react-query';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export const productApi = {
    getAll: async () => {
        const { data } = await apiInstance.get<Product[]>('/products');
        return data;
    },
    getById: async (id: string) => {
        const { data } = await apiInstance.get<Product>(`/products/${id}`);
        return data;
    },
    getCategories: async () => {
        const { data } = await apiInstance.get<string[]>('/products/categories');
        return data;
    }
};

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: productApi.getAll,
    });
};

export const useGetProductById = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => productApi.getById(id),
        enabled: !!id,
    });
};

export const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: productApi.getCategories,
    });
};