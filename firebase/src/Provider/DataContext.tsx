import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Product {
    image: string | undefined;
    ingredients: string[]; // Specify the type for ingredients
    calories: ReactNode;
    category: ReactNode;
    name: string;
    Price: string;
    Quantity: string;
    id: string | undefined; // Change this to string if 'id' is always defined
}

interface AuthProviderProps {
    children: ReactNode;
}

interface DataContextType {
    FoodItemsNew: Product[];
    setFoodItem: React.Dispatch<React.SetStateAction<Product[]>>;
    addFoodITems: (name: string, Price: string, Quantity: string, ingredients: string[], id?: string) => void; // Updated to include ingredients
}

const DetailContext = createContext<DataContextType | undefined>(undefined);

export const useDetailsContext = () => {
    const context = useContext(DetailContext);
    if (!context) {
        throw new Error('useDetailsContext must be used within a DataContext.Provider');
    }
    return context;
};

export const DataContext = ({ children }: AuthProviderProps) => {
    const [FoodItemsNew, setFoodItem] = useState<Product[]>([]);

    const addFoodITems = (name: string, Price: string, Quantity: string, ingredients: string[], id?: string) => {
        const newItem: Product = { name, Price, Quantity, ingredients, id, image: undefined, calories: null, category: null }; // Ensure all properties are included
        setFoodItem((prevItems) => [...prevItems, newItem]);
    };

    return (
        <DetailContext.Provider value={{ FoodItemsNew, setFoodItem, addFoodITems }}>
            {children}
        </DetailContext.Provider>
    );
};
