export const ProductSkeleton = () => {
    return (
        <div className="flex flex-col h-full animate-pulse">
            {/* Имитация контейнера картинки (aspect-[4/5] и закругление [2rem]) */}
            <div className="aspect-[4/5] bg-gray-200 border border-gray-100 rounded-[2rem] mb-4" />

            <div className="px-2">
                {/* Имитация категории (маленькая полоска) */}
                <div className="h-2 bg-gray-200 rounded w-1/4 mb-2" />

                {/* Имитация заголовка (две строки) */}
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
            </div>

            {/* Имитация нижней части (цена + круглая кнопка) */}
            <div className="mt-auto px-2 pb-2 flex items-center justify-between">
                <div className="h-7 bg-gray-200 rounded w-1/3" />
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
            </div>
        </div>
    );
};