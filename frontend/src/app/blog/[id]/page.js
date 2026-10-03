'use client';
export default function SingleBlogPost({ params }) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8 animate-fade-in">
      <article className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="text-3xl font-black text-slate-900">Educational Article: {params?.id || 'School Insight'}</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Comprehensive instructional research conducted by faculty mentors on modern learning methodologies, CBSE syllabus alignment, and student emotional wellbeing.
        </p>
        <a href="/blog" className="text-indigo-600 font-bold text-xs hover:underline">← Back to All Posts</a>
      </article>
    </div>
  );
}
