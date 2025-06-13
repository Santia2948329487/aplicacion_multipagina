import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-6">
      <aside className="w-1/4 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Blog</h3>
        <ul className="space-y-2">
          <li>
            <a href="/blog" className="text-indigo-600 hover:underline">
              Todos los posts
            </a>
          </li>
        </ul>
      </aside>
      <div className="w-3/4">{children}</div>
    </div>
  );
}
