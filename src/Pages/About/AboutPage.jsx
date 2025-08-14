import React from "react";
import {
  AcademicCapIcon,
  UsersIcon,
  GlobeAltIcon,
  LightBulbIcon,
  HeartIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const stats = [
    { label: "Active Students", value: "10,000+", icon: UsersIcon },
    { label: "Expert Teachers", value: "150+", icon: AcademicCapIcon },
    { label: "Countries Served", value: "50+", icon: GlobeAltIcon },
    { label: "Success Rate", value: "95%", icon: StarIcon },
  ];

  const values = [
    {
      icon: LightBulbIcon,
      title: "Innovation",
      description: "We continuously innovate our teaching methods and technology to provide the most effective learning experience.",
    },
    {
      icon: HeartIcon,
      title: "Passion",
      description: "Our passion for education drives us to create meaningful connections between teachers and students worldwide.",
    },
    {
      icon: CheckCircleIcon,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from course content to student support services.",
    },
    {
      icon: UsersIcon,
      title: "Community",
      description: "We believe in building a supportive learning community where everyone can thrive and achieve their goals.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Former Cambridge English teacher with 15+ years of experience in language education.",
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Curriculum",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "PhD in Applied Linguistics, specializing in second language acquisition and digital learning.",
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Full-stack developer passionate about creating intuitive educational technology solutions.",
    },
  ];

  return (
    <div className="min-h-screen bg-light dark:bg-slate-900">
      <div className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About LearnVerse
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Empowering learners worldwide with innovative English education technology. 
            We're on a mission to make quality English learning accessible to everyone, everywhere.
          </p>
        </div>
      </div>

      <section className="md:px-36 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 dark:text-gray-400 mb-6 leading-relaxed">
                At LearnVerse, we believe that language learning should be engaging, effective, and accessible. 
                Our platform combines cutting-edge technology with proven pedagogical methods to create 
                personalized learning experiences that adapt to each student's unique needs and pace.
              </p>
              <p className="text-lg text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
                We're committed to breaking down barriers to quality education and fostering a global 
                community of learners who can communicate confidently in English.
              </p>
              <Link
                to="/online-test"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
              >
                Start Your Journey
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Students learning together"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark dark:text-light mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400">
              See how we're making a difference in English education worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-dark dark:text-light mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="md:px-36 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              These principles guide everything we do and shape the learning experience we create
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="md:px-36 py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate educators and technologists working together to revolutionize English learning
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
                <h3 className="text-xl font-semibold text-dark dark:text-light mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
                Our Story
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-slate-600 dark:text-gray-400">
              <p className="text-lg leading-relaxed mb-6">
                LearnVerse was born from a simple observation: traditional language learning methods 
                weren't keeping pace with how people actually learn in the digital age. Our founder, 
                Sarah Johnson, noticed that her students were struggling with conventional textbook 
                approaches but thrived when using interactive, technology-enhanced methods.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                In 2020, during the global shift to online learning, Sarah assembled a team of 
                educators, linguists, and developers to create something different. We wanted to 
                build a platform that would make English learning not just effective, but genuinely 
                enjoyable and accessible to learners worldwide.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Today, LearnVerse serves thousands of students across 50+ countries, offering 
                personalized learning paths, real-time feedback, and a supportive community that 
                celebrates every milestone in the language learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start your English learning journey today and become part of our global community of learners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/online-test"
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Take Free Assessment
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
