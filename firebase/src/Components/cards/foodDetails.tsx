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
    const [cardDetail,setCardDetail]= useState<CardsDetail | undefined>();
    const orderDetails = [ 
        {  
            id: 1,
            name: "Apple",
            category: "Fruits",
            price: 120.0,
            calories: 95,
            ingredients: ["Apple"],
            image: "https://i.pinimg.com/736x/e7/4e/78/e74e782a805bf6f2cc8f178a6063f9d7.jpg" 
        },
        {
            id: 2,
            name: "Banana",
            category: "Fruits",
            price: 8.3,
            calories: 105,
            ingredients: ["Banana"],
            image: "https://i.pinimg.com/736x/d3/b2/81/d3b281fd7a0388619a4f03f829eef44e.jpg"
        },
        {
            id: 3,
            name: "Briyani",
            category: "Food",
            price: 150.0,
            calories: 165,
            ingredients: ["Chicken,Rice,Masala"],
            image: "https://i.pinimg.com/564x/00/5d/9d/005d9d6f31549a591ebe8bc6d3d1103a.jpg" 
        },
        {
            id: 4,
            name: "Carrot",
            category: "Vegetables",
            price: 30.2,
            calories: 55,
            ingredients: ["Carrot"],
            image: "https://i.pinimg.com/564x/22/75/29/227529389d466ca03424b7efecb05d9a.jpg" 
        },
        {
            id: 5,
            name: "Rice",
            category: "Grains",
            price: 55.7,
            calories: 206,
            ingredients: ["Rice"],
            image: "https://i.pinimg.com/564x/96/86/2b/96862bf06a67ae1c6c3c9584b3b8ea80.jpg" 
        },
        {
            id: 6,
            name: "Salmon",
            category: "Fish",
            price: 50.0,
            calories: 206,
            ingredients: ["Salmon"],
            image: "https://i.pinimg.com/564x/28/47/6b/28476b8f2e3ebfe7625312114e1e0835.jpg" 
        },
        {
            id: 7,
            name: "Egg",
            category: "Dairy",
            price: 6.0,
            calories: 68,
            ingredients: ["Egg"],
            image: "https://i.pinimg.com/236x/83/de/45/83de4586dbb3dea32c1ef76ce176bd94.jpg" 
        },
        {
            id: 8,
            name: "Bread",
            category: "Grains",
            price: 25.0,
            calories: 79,
            ingredients: ["Flour","Yeast","Water"],
            image: "https://i.pinimg.com/564x/95/de/29/95de296ad2145a426481438ce840d9f4.jpg" 
        },
        {
            id: 9,
            name: "Cheese",
            category: "Dairy",
            price: 200.0,
            calories: 402,
            ingredients: ["Milk","Enzymes"],
            image: "https://i.pinimg.com/564x/64/25/6c/64256c83748d2b035ebe0fe59abccce8.jpg" 
        },
        {
            id: 10,
            name: "Almonds",
            category: "Nuts",
            price: 100.0,
            calories: 579,
            ingredients: ["Almonds"],
            image: "https://i.pinimg.com/236x/e8/f5/33/e8f533f635b66b036365a216437fec0f.jpg" 
        }, {
            id: 11,
            name: "Pista",
            category: "Nuts",
            price: 500.0,
            calories: 700,
            ingredients: ["Pista"],
            image: "https://i.pinimg.com/236x/b0/b7/45/b0b7450e705d7e335767fe831e24b8e2.jpg" 
        }, {
            id: 12,
            name: "Sandwich",
            category: "Food",
            price: 300.0,
            calories: 400,
            ingredients: ["Sandwich"],
            image: "https://i.pinimg.com/564x/71/7d/4b/717d4b7f0ae876056e2d8d2ca485e904.jpg" 
        }
    ];


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
            <div className='h-full bg-slate-500 py-7 w-[20%] flex'>
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
                        <div key={index} className='bg-yellow-500 p-5 h-[250px] w-[200px] flex flex-col items-center'>
                           
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
