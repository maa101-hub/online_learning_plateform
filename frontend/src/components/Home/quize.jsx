import React from 'react'

const quize = () => {
  return (
    <section className="bg-white py-20">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
      {/* Image Section */}
      <div className="order-1 md:order-1">
        <img
          src="/quiz.jpg" // replace with your quiz UI image
          alt="Quiz Feature"
          className="rounded-xl shadow-md"
        />
      </div>
  
      {/* Text Section */}
      <div className="order-2 md:order-2">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Boost Learning with Interactive Quizzes</h2>
        <p className="text-gray-600 mb-6">
          Our quiz system is designed to make learning fun and effective. Students can test their understanding, get instant feedback, and compete in live tests.
        </p>
        <ul className="text-gray-700 space-y-3">
          <li>📝 Topic-wise and full-length quizzes</li>
          <li>⏱️ Live test mode with countdown timer</li>
          <li>📈 Instant result analysis and scoring</li>
          <li>🧩 Randomized questions for every attempt</li>
          <li>🏆 Leaderboard to motivate students</li>
          <li>📚 Track progress and revisit weak areas</li>
    
        </ul>
      </div>
    </div>
  </section>
  
  
  )
}

export default quize
