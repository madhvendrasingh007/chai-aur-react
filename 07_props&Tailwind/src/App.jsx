import ProfileCard from "../components/ProfileCard";

const App = () => {
  // Sample user data
  const users = [
    {
      name: "Sarah Johnson",
      age: 28,
      job: "Frontend Developer",
      location: "San Francisco, CA",
      skills: ["React", "JavaScript", "CSS", "Node.js"],
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=faces",
      isOnline: true
    },
    {
      name: "Mike Chen",
      age: 32,
      job: "UX Designer",
      location: "New York, NY",
      skills: ["Figma", "Sketch", "Prototyping", "React.js"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      isOnline: false
    },
    {
      name: "Emily Rodriguez",
      age: 25,
      job: "Data Scientist",
      location: "Austin, TX",
      skills: ["Python", "Machine Learning", "SQL"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      isOnline: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Team Directory</h1>
          <p className="text-gray-600 text-lg">Meet our amazing team members</p>
        </div>
        
        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user, index) => (
            <ProfileCard
              key={index}
              name={user.name}
              age={user.age}
              job={user.job}
              location={user.location}
              skills={user.skills}
              avatar={user.avatar}
              isOnline={user.isOnline}
            />
          ))}
        </div>
        
        {/* Props Demo Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How Props Work Here</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Props Being Passed:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• <code className="bg-gray-100 px-1 rounded">name</code> - String for person's name</li>
                <li>• <code className="bg-gray-100 px-1 rounded">age</code> - Number for age</li>
                <li>• <code className="bg-gray-100 px-1 rounded">job</code> - String for job title</li>
                <li>• <code className="bg-gray-100 px-1 rounded">location</code> - String for location</li>
                <li>• <code className="bg-gray-100 px-1 rounded">skills</code> - Array of skill strings</li>
                <li>• <code className="bg-gray-100 px-1 rounded">avatar</code> - String URL for image</li>
                <li>• <code className="bg-gray-100 px-1 rounded">isOnline</code> - Boolean for status</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">What This Demonstrates:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Passing different data types as props</li>
                <li>• Reusing components with different data</li>
                <li>• Conditional rendering based on props</li>
                <li>• Mapping over arrays in props</li>
                <li>• Default values for props</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;