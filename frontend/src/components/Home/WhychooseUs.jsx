import { BookOpen, User, Calendar, CreditCard } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Courses",
    description: "Learn with engaging video content, quizzes, and hands-on projects",
  },
  {
    icon: User,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of experience",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Study at your own pace with lifetime access to course materials",
  },
  {
    icon: CreditCard,
    title: "Affordable Pricing",
    description: "Quality education at prices that won't break the bank",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EduVerse?</h2>
          <p className="text-xl text-gray-600">Experience learning like never before</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
