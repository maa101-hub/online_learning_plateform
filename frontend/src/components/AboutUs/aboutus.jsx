import React from 'react'

const aboutus = () => {
  return (
    <div className='w-full h-full p-6 bg-zinc-50'>
      <div className="bg-gray-100 py-12">
      {/* Section: Introduction */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-semibold text-gray-800">About Us</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          We are a passionate team dedicated to providing high-quality educational content and a seamless learning experience for students and teachers alike.
        </p>
      </section>

      {/* Section: Our Vision */}
      <section className="bg-white py-8 mb-16 shadow-lg">
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-gray-800">Our Vision</h3>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Our vision is to create a world where learning is accessible, interactive, and empowering, ensuring that every student has the resources they need to succeed.
          </p>
        </div>
      </section>

      {/* Section: Team */}
      <section className="text-center mb-16">
        <h3 className="text-3xl font-semibold text-gray-800">Meet Our Team</h3>
        <div className="flex flex-wrap justify-center mt-8 gap-8">
          {/* Team Member 1 */}
          <div className="w-56 text-center">
            <img src="/team-member1.jpg" alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto"/>
            <h4 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h4>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          {/* Team Member 2 */}
          <div className="w-56 text-center">
            <img src="/team-member2.jpg" alt="Team Member 2" className="w-32 h-32 rounded-full mx-auto"/>
            <h4 className="mt-4 text-xl font-semibold text-gray-800">Jane Smith</h4>
            <p className="text-gray-600">Lead Instructor</p>
          </div>
          {/* Team Member 3 */}
          <div className="w-56 text-center">
            <img src="/team-member3.jpg" alt="Team Member 3" className="w-32 h-32 rounded-full mx-auto"/>
            <h4 className="mt-4 text-xl font-semibold text-gray-800">Emily Davis</h4>
            <p className="text-gray-600">Product Manager</p>
          </div>
        </div>
      </section>

      {/* Section: Why Choose Us */}
      <section className="bg-white py-8 mb-16">
  <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">Why Choose Us?</h3>
  <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
    <div className="flex items-start">
      <div className="mr-4 text-blue-500 text-3xl">🚀</div>
      <p className="text-lg text-gray-600">High-quality courses designed by expert instructors.</p>
    </div>
    <div className="flex items-start">
      <div className="mr-4 text-blue-500 text-3xl">🎓</div>
      <p className="text-lg text-gray-600">Interactive learning tools to enhance engagement.</p>
    </div>
    <div className="flex items-start">
      <div className="mr-4 text-blue-500 text-3xl">💸</div>
      <p className="text-lg text-gray-600">Affordable pricing to make education accessible to everyone.</p>
    </div>
    <div className="flex items-start">
      <div className="mr-4 text-blue-500 text-3xl">🌍</div>
      <p className="text-lg text-gray-600">A strong community of learners and educators.</p>
    </div>
  </div>
</section>


      {/* Section: Achievements */}
      <section className="bg-gray-50 py-8 mb-16">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">Our Achievements</h3>
        <div className="flex justify-around text-center">
          <div>
            <h4 className="text-4xl font-semibold text-blue-500">500+</h4>
            <p className="text-lg text-gray-600">Courses Offered</p>
          </div>
          <div>
            <h4 className="text-4xl font-semibold text-blue-500">200K+</h4>
            <p className="text-lg text-gray-600">Students Enrolled</p>
          </div>
          <div>
            <h4 className="text-4xl font-semibold text-blue-500">50+</h4>
            <p className="text-lg text-gray-600">Certified Instructors</p>
          </div>
        </div>
      </section>

    </div>
    </div>
  )
}

export default aboutus
