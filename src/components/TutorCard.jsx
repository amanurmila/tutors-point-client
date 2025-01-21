import React from "react";

const TutorCard = ({tutor}) => {

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center p-4">
        <div className="w-16 h-16">
          <img
            className="w-full h-full rounded-full object-cover border-2 border-blue-500"
            src={tutor.photoURL}
            alt={`${tutor.name}'s profile`}
          />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-800">{tutor.name}</h2>
          <p className="text-gray-600">{tutor.role}</p>
          <p className="text-gray-500 text-sm">{tutor.email}</p>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
