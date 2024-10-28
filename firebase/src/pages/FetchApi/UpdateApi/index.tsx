import Header from '@/Components/Header';
import React, { useState, useEffect } from 'react';

const PostDataFetch = () => {
  const [postDataDetails, setPostData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  // Fetch the initial post data
  async function fetchPostData() {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPostData(data);
      setFormData({ title: data.title, body: data.body }); // Set the form data to the fetched post data
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  // Update the post data
  async function updatePostData() {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
          userId: 1, // Including userId as required by the API
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPostData(data);
      console.log(data);
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePostData();
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <><Header FoodItems={[]}/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Post Data</h2>

        {isLoading ? (
          <p className="text-center text-blue-600">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Body</label>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-24"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? 'Updating...' : 'Update Post'}
            </button>
          </form>
        )}

        {postDataDetails && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Updated Post Details:</h3>
            <pre className="mt-2 text-sm text-gray-800">{JSON.stringify(postDataDetails, null, 2)}</pre>
          </div>
        )}

        {error && <p className="mt-4 text-red-500 text-sm">Error: {error}</p>}
      </div>
    </div></>
  );
};

export default PostDataFetch;
