import React from 'react';

// ProfileCard component that receives props
const ProfileCard = ({ name, age, job, location, skills, avatar, isOnline }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm mx-auto transform hover:scale-105 transition-transform duration-300">
      {/* Avatar section */}
      <div className="relative mb-4">
        <img 
          src={avatar || 'https://via.placeholder.com/100'} 
          alt={`${name}'s avatar`}
          className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500"
        />
        {/* Online status indicator */}
        <div className={`absolute bottom-0 right-1/2 transform translate-x-10 w-4 h-4 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
      </div>
      
      {/* Name and status */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600">{job}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
      
      {/* Age */}
      <div className="mb-4">
        <p className="text-gray-700"><span className="font-semibold">Age:</span> {age} years old</p>
      </div>
      
      {/* Skills */}
      <div className="mb-4">
        <p className="font-semibold text-gray-700 mb-2">Skills:</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {/* Contact button */}
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
        Contact {name}
      </button>
    </div>
  );
};

export default ProfileCard;