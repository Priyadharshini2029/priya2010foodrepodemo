import React, { useState } from 'react';
import { CgCloseR } from 'react-icons/cg';



interface CardsDetail {
  id?: string;
  name: string;
  Price: string;
  
}

interface FoodModelProps {
  cardDetail: CardsDetail;
  setHanldeCardShow:()=>void;
}

const FoodModel: React.FC<FoodModelProps> = ( {cardDetail,setHanldeCardShow }) => {
  console.log("Passed CardItem:", cardDetail);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false); 

  const handleOrderClick = () => {
    setIsOrderSuccess(true);
    setTimeout(() => {
      setIsOrderSuccess(false); 
    }, 6000);
  };

  return (
    <div className="fixed inset-1 bg-black/55 flex  items-center justify-center w-full h-full">
      <button onClick={setHanldeCardShow} className=' absolute top-6 right-6 bg-black hover:bg-red-300 text-red-500'><CgCloseR size={40}/></button>
      <div className="bg-yellow-300 rounded-lg grid grid-cols-1 justify-center items-center p-5 h-[400px] border border-t-4 border-b-4 border-r-4 border-l-4  border-gray-950  w-[400px]">
        <h2 className=' flex justify-center items-center text-white text-lg font-bold '>FoodItem</h2>
        <div className=' bg-cyan-500  justify-center items-center p-4 border border-t-2 border-b-2 border-r-2 border-l-2  border-white rounded-xl h-[90%]'>
       
       {/* Image Container */}
       {/* <div className="flex justify-center items-center">
            <img
              src={cardDetail.image}
              alt={cardDetail.name}
              className="max-w-full max-h-full object-cover rounded-lg shadow-xl"
            />
          </div> */}
    

        <h1 className=' flex gap-x-2 '>Food Id: <h2>{cardDetail.id}</h2></h1>
        <p className=' flex gap-x-2 '>FoodName: <p>{cardDetail.name}</p></p>
        <p className=' flex gap-x-2 '>Price: <p>${cardDetail.Price}</p></p>
        {/* <p className=' flex gap-x-2 '>Catogary: <p>{cardDetail.category}</p></p>
        <p className=' flex gap-x-2 '>Calories: <p>{cardDetail.calories}</p></p>
        <p className=' flex gap-x-2 '>Ingredients:<p>{cardDetail.ingredients.join(',')}</p></p> */}
        <div className="flex justify-end mt-1">
          <button   onClick={handleOrderClick} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-600">
            Order 
          </button>
        </div>
      </div>
      {/* Success Message */}
      {isOrderSuccess && (
          <p className="text-black text-lg font-bold mt-4 text-center ">
            Successfully Ordered....! Thank You..!
          </p>
        )}
    </div></div>
  );
};

export default FoodModel;
   

