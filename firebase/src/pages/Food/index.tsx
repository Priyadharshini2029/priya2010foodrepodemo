import { useEffect, useState } from "react"
import {db} from '@/firebase'
import { collection} from "firebase/firestore"
import { addDoc,getDocs } from "firebase/firestore"
import Header from "@/Components/Header"
import Footer from "@/Components/SubComponents/Footer"
import { useRouter } from "next/router"

export default function CreateFoodDetails() {
  const [name, setName] = useState("")
  const [Price, setPrice] = useState("")
  const [Quantity, setQuantity] = useState("")
  const router = useRouter();

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
        }as any))
        console.log("Fetched Data:",fetchedData)
    }catch(e){
        console.error(e)
    }
}
  useEffect(()=>{
    fetchData()
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      console.log("Please enter a food name.")
      return
    }
    try{
        const userDocRef = collection(db,"FoodOrder");
        const foodId =  await addDoc(userDocRef,{name,Price,Quantity})
        console.log("FoodId:",foodId.id)

    }catch(e){
        console.error(e)
    }

    // Handle form submission
    console.log("Food name submitted:", { name,Price,Quantity })

    // Reset form after successful submission
    setName("")
  }

  return (
    <><Header FoodItems={[]} />
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="w-full max-w-md bg-blend-multiply p-6 shadow-lg rounded-lg border border-t-4 border-b-4 border-r-4 border-l-4  border-gray-950">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Create Food Details</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                Food Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Food Name"
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                Price
              </label>
              <input
                id="name"
                type="text"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                Quantity
              </label>
              <input
                id="name"
                type="text"
                value={Quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder=" Enter quantity"
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-500 focus:ring-4 focus:ring-blue-500"
            >
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div><Footer/></>
  )
}