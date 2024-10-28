import Header from '@/Components/Header';
import React, { useEffect, useState } from 'react';

// Define the interface for the data structure
interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const FetchApiData: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // State to store the array of todos

  const fetchData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data: Todo[] = await response.json(); // Use Todo array interface for the response
      setTodos(data); // Set the fetched data in state
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div><Header FoodItems={[]}/>
      <h2 className='flex p-5 justify-center items-center text-2xl font-bold text-purple-900'>Todo List</h2>
      <div className=' grid grid-cols-3 p-6 justify-center items-center'>      
        {todos.length > 0 ? (todos.map(todo => (
          <div key={todo.id} style={{ marginBottom: '20px' }}>
            <p><strong>Title:</strong> {todo.title}</p>
            <p><strong>Body:</strong> {todo.body}</p>
            <p><strong>User ID:</strong> {todo.userId}</p>
          </div>
          
        ))
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </div>
  );
};

export default FetchApiData;
