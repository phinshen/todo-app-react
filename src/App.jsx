import { useState, useEffect } from "react";

// fetching data from API
async function fetchUserId(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  const data = await response.json();
  return data;
}

export default function App() {
  const [userId, setUserId] = useState(""); // to store the selected user id
  const [posts, setPosts] = useState([]); // store the posts get from API
  const [loading, setLoading] = useState(false); // to show or hide loading message
  const [error, setError] = useState(null); // to store any error message from the API fetch
  const userIdOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //list of available user Id for dropdown option

  useEffect(() => {
    setError(null) //clear previour error messages whenever new userid is selected
    if (userId) {
      setLoading(true); // to load the loading message
      fetchUserId(userId)
        .then((data) => setPosts(data))
        .catch((error) => {
          console.error(error);
          setError("Failed to fetch posts. Please try again later.");
        })
        .finally(() => setLoading(false))
    }
  }, [userId]); // run useEffect only when userId changes

  return (
    <div>
      <h1>Posts by User</h1>
      <label htmlFor="userIdSelect"></label>
      <select
        id="userIdSelect"
        value={userId}
        onChange={(event) => setUserId(event.target.value)}
        disabled={loading}
      >

        <option value="">-- Select a User ID --</option>
        {userIdOptions.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>
      {loading && <p>Loading...</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

// disabled={loading} - disable the dropdown when loading is true