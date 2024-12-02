// page.tsx

import React from 'react';

const HomePage = () => {
  // Data for Books
  const books = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      coverImage: '/images/great-gatsby.jpg',
    },
    {
      title: '1984',
      author: 'George Orwell',
      coverImage: '/images/1984.jpg',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      coverImage: '/images/to-kill-a-mockingbird.jpg',
    },
  ];

  // Data for Movies
  const movies = [
    {
      title: 'Inception',
      director: 'Christopher Nolan',
      posterImage: '/images/inception.jpg',
    },
    {
      title: 'The Matrix',
      director: 'The Wachowskis',
      posterImage: '/images/matrix.jpg',
    },
    {
      title: 'Interstellar',
      director: 'Christopher Nolan',
      posterImage: '/images/interstellar.jpg',
    },
  ];

  // Data for Certificates
  const certificates = [
    {
      title: 'Full Stack Web Development',
      issuer: 'Coursera',
      certificateImage: '/images/certificate1.jpg',
    },
    {
      title: 'Data Science Specialization',
      issuer: 'edX',
      certificateImage: '/images/certificate2.jpg',
    },
  ];

  // Data for Courses
  const courses = [
    {
      title: 'Introduction to Algorithms',
      instructor: 'Prof. Smith',
      description: 'An in-depth study of algorithms and data structures.',
    },
    {
      title: 'Advanced Mathematics',
      instructor: 'Dr. Jones',
      description: 'Topics in advanced calculus and linear algebra.',
    },
  ];

  // Data for Lessons
  const lessons = [
    {
      title: 'Machine Learning Basics',
      date: '2024-10-15',
      summary: 'An introduction to machine learning concepts and techniques.',
    },
    {
      title: 'Understanding Quantum Mechanics',
      date: '2024-10-18',
      summary: 'A deep dive into the principles of quantum physics.',
    },
  ];

  // Data for Goals
  const goals = [
    'Complete my thesis by the end of the semester.',
    'Learn advanced React and Next.js concepts.',
    'Contribute to an open-source project.',
  ];

  // Data for Daily Homework Posts
  const homeworkPosts = [
    {
      date: '2024-11-28',
      content: 'Completed exercises 1-5 on page 42 of the calculus textbook.',
    },
    {
      date: '2024-11-29',
      content: 'Wrote a summary of Chapter 3 from the psychology course.',
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="text-center py-8 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold">Üniversite Serüvenim</h1>
        <p className="mt-2 text-lg">Deneyimlerimi, başarılarımı ve günlük ilerlemelerimi paylaşıyorum</p>
      </header>

      {/* Main Content */}
      <main className="mt-8 space-y-16">
        {/* Books Section */}
        <section id="books">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Okuduğum Kitaplar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover"/>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                  <p className="text-gray-700">Yazar: {book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Movies Section */}
        <section id="movies">
          <h2 className="text-3xl font-bold text-red-600 mb-6">İzlediğim Filmler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {movies.map((movie, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={movie.posterImage} alt={movie.title} className="w-full h-48 object-cover"/>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{movie.title}</h3>
                  <p className="text-gray-700">Yönetmen: {movie.director}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates">
          <h2 className="text-3xl font-bold text-purple-600 mb-6">Aldığım Sertifikalar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certificates.map((cert, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={cert.certificateImage} alt={cert.title} className="w-full h-48 object-cover"/>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{cert.title}</h3>
                  <p className="text-gray-700">Veren Kurum: {cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">Aldığım Kurslar</h2>
          <div className="space-y-4">
            {courses.map((course, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-gray-700">Eğitmen: {course.instructor}</p>
                <p className="mt-2">{course.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lessons Section */}
        <section id="lessons">
          <h2 className="text-3xl font-bold text-teal-600 mb-6">Desrsler</h2>
          <div className="space-y-4">
            {lessons.map((lesson, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold">{lesson.title}</h3>
                <p className="text-gray-700">Tarih: {lesson.date}</p>
                <p className="mt-2">{lesson.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Goals Section */}
        <section id="goals">
          <h2 className="text-3xl font-bold text-yellow-600 mb-6">Hedeflerim</h2>
          <ul className="list-disc list-inside space-y-2">
            {goals.map((goal, idx) => (
              <li key={idx} className="text-lg">{goal}</li>
            ))}
          </ul>
        </section>

        {/* Daily Homework Section */}
        <section id="homework">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6">Günlük Ödev Yazıları</h2>
          <div className="space-y-4">
            {homeworkPosts.map((post, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700">Tarih: {post.date}</p>
                <p className="mt-2">{post.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 mt-8 border-t">
        <p className="text-gray-600">© 2024 Üniversite Serüvenim</p>
      </footer>
    </div>
  );
};

export default HomePage;
