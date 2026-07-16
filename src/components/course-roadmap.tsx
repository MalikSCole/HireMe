export function CourseRoadmap({ category, modules }: { category: string; modules: Array<{ title: string; completed: number; total: number }> }) {
  return (
    <section className="mt-10 rounded-xl border bg-gray-50 p-6" aria-labelledby="course-roadmap-title">
      <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Visual roadmap</p><h2 id="course-roadmap-title" className="mt-1 text-xl font-semibold">Your path through {category.toUpperCase()}</h2></div><span className="text-3xl" aria-hidden="true">⌁</span></div>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{modules.map((module, index) => {
        const done = module.completed === module.total;
        return (
          <li key={module.title} className={done ? "relative rounded-lg border-2 border-green-500 bg-green-50 p-4" : "relative rounded-lg border bg-white p-4"}>
            <div className="flex items-center gap-3"><span className={done ? "flex h-9 w-9 items-center justify-center rounded-full bg-green-600 font-bold text-white" : "flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800"}>{done ? "✓" : index + 1}</span><div><p className="font-semibold">{module.title}</p><p className="text-xs text-gray-500">{module.completed}/{module.total} lessons</p></div></div>
          </li>
        );
      })}</ol>
    </section>
  );
}
