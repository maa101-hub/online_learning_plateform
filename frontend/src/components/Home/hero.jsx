import React from 'react'

const hero = () => {
  return (
      <section className="bg-indigo-50 min-h-screen flex items-center justify-center px-6 md:px-16 relative">
  <div className="max-w-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">
    
    
    <div className="space-y-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
        Learn. Connect. Grow. with
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EduVerse
              </span>
        
      </h1>
      <p className="text-gray-600 text-lg">
        Join interactive courses, live chats, and real-time tests from top educators — all in one place.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="/courses" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow">
          Explore Courses
        </a>
        <a href="/login" className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-indigo-600 shadow">
          Join as Teacher
        </a>
      </div>
    </div>

  
    <div className="w-full h-48 sm:h-64 md:h-[300px] bg-white border-4 rounded-xl flex items-center justify-center text-indigo-400 text-xl overflow-hidden">
      <img src='/e-learning.jpeg' className='w-full h-full '/>
    </div>

  </div>
  <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500 rounded-full opacity-50 animate-bounce"></div>
  <div className="absolute bottom-1 right-auto w-28 h-28 bg-indigo-400 rounded-full opacity-30 animate-pulse"></div>
</section>

   
  )
}

export default hero
