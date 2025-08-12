import React from 'react';
import { useNavigate } from 'react-router-dom';

const templatesData = [
  {
    id: 1,
    name: 'Template One',
    img: '/template1.png',
  }

];

function Templates() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/templates/${id}`);
  };

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
            <div className="overflow-hidden">
              <img
                src={img}
                alt={name}
                className="w-full h-[400px] object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
            <div className="bg-teal-400 p-4">
              <h2 className="text-white font-semibold text-xl text-center">
                {name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;
