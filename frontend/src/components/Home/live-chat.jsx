import React from 'react'

const livechat = () => {
  return (
    <section className="bg-gray-50 py-16">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Real-Time Live Chat</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Our interactive live chat connects students and teachers instantly. Ask questions, get feedback, and learn better — all in real-time.
      </p>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <div className="text-indigo-600 mb-4 text-4xl">💬</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Instant Messaging</h3>
          <p className="text-gray-600 text-sm">
            Chat with your teachers and peers instantly during classes or doubt sessions.
          </p>
        </div>
  
        {/* Feature 2 */}
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <div className="text-indigo-600 mb-4 text-4xl">🗂️</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">File Sharing</h3>
          <p className="text-gray-600 text-sm">
            Share notes, PDFs, assignments, and resources right in the chat window.
          </p>
        </div>
  
        {/* Feature 3 */}
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <div className="text-indigo-600 mb-4 text-4xl">🔔</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Smart Notifications</h3>
          <p className="text-gray-600 text-sm">
            Get instant alerts for replies, assignments, and teacher messages — never miss a thing.
          </p>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default livechat
