import React, { useEffect, useState } from 'react';
import './App.css'

interface IUser {
  _id: string;
  username: string;
  email: string;
  friendCount: number;
}

interface IThought {
  _id: string;
  thoughtText: string;
  username: string;
  createdAt: Date;
  reactionCount: number;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [thoughts, setThoughts] = useState<IThought[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch ('/routes/userRoutes');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchThoughts = async () => {
      try {
        const response = await fetch('/routes/thoughtRoutes');
        const data = await response.json();
        setThoughts(data);
      } catch (error) {
        console.error('Error fetching thought:', error);
      }
    }; 

    fetchUsers();
    fetchThoughts();
  }, []);

  const handleCreateUser = async () => {
    const newUser = {
      username: 'newuser',
      email: 'newuser@example.com',
    };

    try {
      const response= await fetch('/routes/userRoutes', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      setUsers([...users, data]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleCreateThought = async () => {
    const newThought = {
      thoughttext: 'This is a new thought',
      username: 'newUser',
      userId: 'userIdHere',
    };

    try {
      const response = await fetch('/routes/thoughtRoutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newThought),
      });
      const data = await response.json();
      setThoughts([...thoughts, data]);
    } catch (error) {
      console.error('Error creating thought:', error);
    }
  };

  return (
    <div>
      <h1>Social Media App</h1>

      <button onClick={handleCreateUser}>Create User</button>
      <button onClick={handleCreateThought}>Create Thought</button>

      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} -{user.friendCount} friends
          </li>
        ))}
      </ul>

      <h2>Thoughts</h2>
      <ul>
        {thoughts.map((thought) => (
          <li key={thought._id}>
            <p>{thought.username}: {thought.thoughtText}</p>
            <p>Created at: {new Date(thought.createdAt).toLocaleString()}</p>
            <p>Reactions: {thought.reactionCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
