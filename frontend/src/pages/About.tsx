import { NavLink } from 'react-router-dom';
import { 
  UserGroupIcon, 
  LightBulbIcon, 
  RocketLaunchIcon,
  EnvelopeIcon,
  ChevronRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { 
  CheckBadgeIcon,
  HeartIcon,
  GlobeAltIcon
} from '@heroicons/react/24/solid';

export default function About() {
  const stats = [
    { label: 'Active Users', value: '10K+', icon: UserGroupIcon },
    { label: 'Documents Created', value: '50K+', icon: SparklesIcon },
    { label: 'Success Rate', value: '99.9%', icon: CheckBadgeIcon },
    { label: 'Countries Served', value: '25+', icon: GlobeAltIcon }
  ];

  const features = [
    {
      icon: RocketLaunchIcon,
      title: 'Lightning Fast',
      description: 'Optimized performance for seamless user experience'
    },
    {
      icon: LightBulbIcon,
      title: 'Smart Technology',
      description: 'AI-powered solutions that adapt to your needs'
    },
    {
      icon: HeartIcon,
      title: 'User-Centered',
      description: 'Designed with your workflow and preferences in mind'
    }
  ];

  const teamMembers = [
    {
      name: 'Lima Codes',
      role: 'Founder & Lead Developer',
      image: 'https://ui-avatars.com/api/?name=Lima+Codes&background=8b5cf6&color=fff&size=200',
      bio: 'Passionate about creating innovative solutions for modern businesses.'
    },
    {
      name: 'Maria Silva',
      role: 'UX/UI Designer',
      image: 'https://ui-avatars.com/api/?name=Maria+Silva&background=06b6d4&color=fff&size=200',
      bio: 'Crafting beautiful and intuitive user experiences.'
    },
    {
      name: 'João Santos',
      role: 'Backend Engineer',
      image: 'https://ui-avatars.com/api/?name=João+Santos&background=10b981&color=fff&size=200',
      bio: 'Building robust and scalable backend systems.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden ">
        {/* Background Pattern */}
        <div className="absolute inset-0 hero-pattern opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full  text-sm font-medium mb-6">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Revolutionizing Data Management
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold  mb-6 tracking-tight">
              About <span className="bg-gradient-to-r from-gray-300 to-primary-600 bg-clip-text text-transparent">CadastRAR</span>
            </h1>
            
            <p className="text-xl lg:text-2xl  max-w-4xl mx-auto mb-8 leading-relaxed">
              We are committed to revolutionizing data management and document generation through 
              <span className="font-semibold "> AI-driven solutions</span> that empower businesses worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to="/posts/create"
                className="inline-flex items-center px-8 py-3 bg-white text-gray-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
              >
                Get Started
                <ChevronRightIcon className="h-5 w-5 ml-2" />
              </NavLink>
              
              <NavLink
                to="/submissions"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-600 transition-all duration-200"
              >
                View Submissions Dashboard
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-900/30 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
                  <stat.icon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 text-sm font-medium rounded-full mb-4">
                <RocketLaunchIcon className="h-4 w-4 mr-2" />
                Our Mission
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Empowering businesses with cutting-edge technology
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                To simplify data management and enhance operational efficiency through innovative, 
                user-friendly solutions that scale with your business needs.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-900/30 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-400 to-primary-600 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <RocketLaunchIcon className="h-16 w-16 text-gray-600 dark:text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Innovation</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Driving progress through technology
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 text-sm font-medium rounded-full mb-4">
              <UserGroupIcon className="h-4 w-4 mr-2" />
              Our Team
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the minds behind CadastRAR
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our team consists of passionate individuals dedicated to innovation and excellence in technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative inline-block mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                      <CheckBadgeIcon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-4">
                    {member.role}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-600 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          
          <p className="text-xl text-gray-100 mb-8">
            Join thousands of users who trust CadastRAR for their data management needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              <UserGroupIcon className="h-5 w-5 mr-2" />
              Create Account
            </NavLink>
            
            <a
              href="https://lima-theta.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-600 transition-all duration-200"
            >
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
