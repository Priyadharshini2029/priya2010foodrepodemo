import React, { useState } from 'react';
import FoodModel from "@/Components/cards/FoodModel";
import { useDetailsContext } from '../../Provider/DataContext';


interface CardsDetail {
    id?: string; 
    name: string;  
    Price: string; 
    // calories: number; 
    // category: string;
    // ingredients: string[];  
    // image: string; 
}

const FoodDetails = () => {
    const { FoodItemsNew } = useDetailsContext();
    console.log("Data Context Cards:", FoodItemsNew);

    const [searchQuery, setSearchQuery] = useState("");
    const [isCardShow, setIsCardShow]=useState(false)
    const [cardDetail,setCardDetail]= useState<CardsDetail>();


    const hanldeCardsShow = (Carditem:CardsDetail )=>{

        setIsCardShow(true)
        setCardDetail(Carditem)
        console.log("clicked Card Item:", Carditem);

    }

    const handleCloseItemModel = ()=>{
        setIsCardShow(false)
    }

    console.log("Query:",searchQuery)

    return (
        <div className='h-full flex justify-center items-center p-1 w-full'>
            <div className='h-full bg-slate-600 py-7 w-[20%] flex'>
                <div className='flex px-1 w-[100px] h-[20px]'>
                    <p className='w-full text-black flex'> 
                        Search:
                        <input 
                            className='w-[100px]' 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            type="text" 
                        />
                    </p>
                </div>
            </div>

            <div className='h-full pl-10 grid grid-cols-3 gap-1 py-2 overflow-y-auto w-full'>
                {FoodItemsNew
                    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((details, index) => (
                        <div key={index} className='bg-yellow-300 p-5 h-[3000px] w-[250px] flex flex-col items-center'>
                           
                            {/* <img 
                                src={details.image} 
                                alt={details.name} 
                                className='w-full h-[150px] object-cover mb-4 rounded-lg shadow-md' 
                            /> */}
                            <h1 >{details.id}</h1>
                            <p >{details.name}</p>
                            <p >{details.Price}</p>
                            {/* <p >{details.category}</p> */}
                            {/* <p > {details.calories}</p>
                            <p >{details.ingredients}</p> */}
                            {/* Order Buttons */}
         <div className="flex justify-between mt-4">
          <button  onClick={()=>hanldeCardsShow(details)} className="bg-purple-900 font-bold text-white px-4 py-2 rounded-lg hover:bg-purple-400">
            Order Now
          </button>
          
        </div>
        </div>
                    ))}
            
            {(isCardShow && cardDetail)  && <FoodModel setHanldeCardShow={handleCloseItemModel} cardDetail={cardDetail}/>}
         </div>
         </div>
    );
};

export default FoodDetails;
