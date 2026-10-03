'use client';
export default function BlogIndexPage() {
  const blogPosts = [
    { id: 'ai-in-k12-classrooms', title: 'The Role of Artificial Intelligence in K-12 Classrooms', date: 'March 29, 2026', author: 'Dr. V. K. Sharma', excerpt: 'How guided AI tools assist teachers in personalizing assessments.' },
    { id: 'reading-habits-in-children', title: 'Cultivating Lifelong Reading Habits in Primary Schoolers', date: 'February 15, 2026', author: 'Mrs. Anjali Sen', excerpt: 'Early literacy routines build cognitive empathy, rich vocabularies, and analytical thinking.' },
    { id: 'athletics-and-board-exams', title: 'Balancing Athletics and Board Exams: A Topper’s Guide', date: 'January 10, 2026', author: 'Mr. Amit Chauhan', excerpt: 'Why structured physical activity enhances mental stamina, reduces exam anxiety.' }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-black text-slate-900">School Blog & Educational Insights (Section 76)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((blog) => (
          <div key={blog.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs text-indigo-600 font-bold">{blog.date}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{blog.title}</h3>
              <p className="text-slate-600 text-xs mt-2">{blog.excerpt}</p>
            </div>
            <div className="pt-4 border-t mt-4 flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase">By {blog.author}</span>
              <a href={"/blog/" + blog.id} className="text-indigo-600 font-bold text-xs hover:underline">Read Full Post →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
