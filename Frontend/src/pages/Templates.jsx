import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const templatesData = [
  {
    id: 1,
    name: 'Template One',
    img: '/template1.png',
  }

];



function Templates() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState({}); // track image loading

  const handleClick = (id) => {
    navigate(`/templates/${id}`);
  };

  if (!user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="text-center text-5xl">Please login to use this feature</div>
        <button
          className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-teal-400 mb-10 text-center">
        Choose Your Resume Template
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {templatesData.map(({ id, name, img }) => (
          <div
            key={id}
            onClick={() => handleClick(id)}
            className="cursor-pointer rounded-lg overflow-hidden shadow-lg border-2 border-teal-400 hover:shadow-teal-400 transition duration-300"
          >
            <div className="overflow-hidden relative">
              {/* Skeleton */}
              {!loaded[id] && (
                <div className="w-full h-[400px] bg-gray-300 animate-pulse absolute top-0 left-0" />
              )}

              {/* Actual image */}
              <img
                src={img}
                alt={name}
                className={`w-full h-[400px] object-cover transform hover:scale-105 transition duration-300 ${
                  loaded[id] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setLoaded((prev) => ({ ...prev, [id]: true }))}
              />
            </div>
            <div className="bg-teal-400 p-4">
              <h2 className="text-white font-semibold text-xl text-center">{name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;