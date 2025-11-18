import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { LogOut } from 'lucide-react';
import { ToastContainer,toast } from 'react-toastify';
import useLogout from '../../utils/logout';
import { useNavigate } from 'react-router-dom';

const Header = ({ name="User" }) => {
  const navigate = useNavigate();
  const logout = useLogout();
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
   
  return (
    <header className="flex items-center justify-between px-6 py-4 w-full shadow-md bg-white/80 backdrop-blur-md">
      <h1 className="text-2xl font-bold text-indigo-600 hover:cursor-pointer" onClick={()=>navigate('/')}>
        
      <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EduVerse | Teacher Dashboard
              </span>
        </h1>
      <ToastContainer/>
      <div className="flex items-center space-x-4">
        <BellIcon className="h-6 w-6 text-gray-600" />
        <span className="text-gray-800 font-medium">{name}</span>
        <div className="bg-amber-900 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold">
          {initials}
        </div>
        <LogOut className='text-red-600 -mr-4 -ml-3 text-sm hover:scale-105' onClick={logout}/>
      </div>
     
    </header>
  );
};

export default Header;
