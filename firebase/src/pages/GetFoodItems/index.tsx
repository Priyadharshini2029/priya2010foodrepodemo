import {db} from '@/firebase'
import { useEffect, useState } from "react"
import { collection, doc} from "firebase/firestore"
import { getDocs,deleteDoc } from "firebase/firestore"
import Header from '@/Components/Header'
import Footer from '@/Components/SubComponents/Footer'
import { useRouter } from 'next/router'
import { useDetailsContext } from '../../Provider/DataContext';



interface Product {
    name: string
    Price: string
    Quantity: string
    id:string
  }

export default function ProductTable() {

    const [FoodItems,setFoodeItem] = useState<Product[]>([]);
    const [Message, setmessage]=useState("")
    const router = useRouter();
    const { FoodItemsNew,addFoodITems } = useDetailsContext();


    useEffect(()=>{
      const authToken =  localStorage.getItem("Mhytoken")
      const userauth = localStorage.getItem("MhytokenUserId")
      if(!authToken && !userauth){
        router.push("/")
      }
    },[router])

    const fetchData =async ()=>{
        try{
            const userDocRef = collection(db,"FoodOrder");
            const foodIdget =  await getDocs(userDocRef)
            const fetchedData = foodIdget.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }as Product))
            setFoodeItem(fetchedData)
            console.log("Fetched Data:",fetchedData)
        }catch(e){
            console.error(e)
        }
    }

    const handleDeleteFoodItem = async (FoodId: string) => {
        try {
          // Use `doc()` to reference a specific document in the collection
          const userDocRef = doc(db,"FoodOrder", FoodId);  // This returns a document reference

          // Now delete the document using the reference
          await deleteDoc(userDocRef);

          // Success message
          setmessage(`Food item successfully deleted for id: ${FoodId}`);

          // Optionally refetch data after deletion
          fetchData();
        } catch (error){
         setmessage(`Delete failed for id: ${FoodId}, Error: ${error.message}`);
        }
      };


    useEffect(()=>{
        fetchData()
      },[])

      console.log("Fetch Context data:", FoodItemsNew);

    return (
        <><Header FoodItems={[]}/>
      <table className="min-w-full table-auto border-collapse border-[2px] border-gray-300">
        <caption className="caption-top text-lg font-semibold py-2">
          A simple table of product inventory
        </caption>
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 w-[200px] text-center border-gray-300">Name</th>
            <th className="px-4 py-2 text-center border border-gray-300">Price</th>
            <th className="px-4 py-2 text-center border border-gray-300">Quantity</th>
            <th className="px-4 py-2 text-center border border-gray-300">Action</th>

          </tr>
        </thead>
        <tbody>
          {FoodItems.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 text-center border border-gray-300 font-medium"><a href={`/FoodSingle/${product.name}/${product.id}`}>{product.name}</a> </td>
              <td className="px-4 py-2 text-center border border-gray-300">${product.Price}</td>
              <td className="px-4 py-2 text-center border border-gray-300">{product.Quantity}</td>
              <td className="px-4 py-2 text-center border border-gray-300">
              
                <button onClick={()=>handleDeleteFoodItem(product.id)} className=' bg-purple-800 text-white p-2 hover:bg-purple-950 border rounded-lg w-[50%]'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       <div className=' flex justify-center  w-[600px] items-center p-3'>
       {Message && <div className=' p-3 bg-sky-500 ' >
           <p className=' text-white'>
           {Message}
           </p>
       </div>}
   </div><Footer/>
   </>
    )
  }