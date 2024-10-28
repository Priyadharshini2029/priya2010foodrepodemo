import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Product {
    image: string | undefined;
    ingredients: any;
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
    addFoodITems: (name: string, Price: string, Quantity: string, id?: string) => void;
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

    const addFoodITems = (name: string, Price: string, Quantity: string, id?: string) => {
        setFoodItem((prevNotes) => [...prevNotes, { name, Price, Quantity, id }]);
    };

    return (
        <DetailContext.Provider value={{ FoodItemsNew, setFoodItem, addFoodITems }}>
            {children}
        </DetailContext.Provider>
    );
};
