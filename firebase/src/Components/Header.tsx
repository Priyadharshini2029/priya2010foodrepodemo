import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useDetailsContext } from '../Provider/DataContext';
import { db } from '@/firebase';
import { collection, getDocs } from "firebase/firestore"; 

interface Product {
  name: string;
  Price: string;
  Quantity: string;
  id: string | undefined ;
}

interface DemoHeaderProps {
  FoodItems: Product[]; // Define the type for the FoodItems prop
}

const Header: React.FC<DemoHeaderProps> = () => {
  const route = useRouter();
  const { FoodItemsNew, addFoodITems } = useDetailsContext();

  const fetchData = async () => {
    try {
      const foodIdget = await getDocs(collection(db, 'FoodOrder'));
      const fetchedData = foodIdget.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Product)
      );
      // Add each product individually using addFoodITems
        // Add each product individually using addFoodITems
        if(FoodItemsNew.length === 0){
          fetchedData.forEach(({ name, Price, Quantity, id }) => addFoodITems(name, Price, Quantity, id));
        }

      console.log('Fetched Data Header Context 1:', fetchedData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
      fetchData();
  }, []);

  
  console.log('Fetched Data Header Context 2:', FoodItemsNew);


    const HeaderData = [{ Label:"Food",Link:"/Food"},
      { Label:"GetFoodItems",Link:"/GetFoodItems"},
      { Label:"UpdateFoodItem",Link:"/UpdateFoodItem"},
      { Label:"Card",Link:"/Cards"},
      { Label: "FetchAllData", Link: "/FetchApi" },
      { Label: "FetchPostData", Link: "/FetchApi/PostApi" },
      { Label: "FetchById", Link: "/FetchApi/FetchSingle" },
      { Label: "FetchUpdateData", Link: "/FetchApi/UpdateApi" },
      { Label: "FetchDeleteData", Link: "/FetchApi/DeleteApi" }
      ]

    const handleLogout = ()=>{
      localStorage.removeItem("Mhytoken")
      localStorage.removeItem("MhytokenUserId")
      route.push("/")
      
    }
  return (
    <div className=' flex justify-between bg-teal-700'>
        <div className=' p-3 gap-4  flex'>
            {HeaderData.map((header)=>(
                <div key={header.Label} className=' bg-black text-white hover:bg-slate-600 border border-none p-2 rounded-lg outline-none '><a className=' text-white' href={`${header.Link}`}>{header.Label}</a></div>
            ))}
        </div>
        <div className=' flex justify-center items-center p-3'>
          <button onClick={handleLogout} className='  text-white bg-black  hover:bg-slate-600 p-2 border border-none rounded-lg'>logout</button>
        </div>
    </div>
  )
}

export default Header;