import { Link } from "react-router-dom";

type Article = {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  content: string;
  imageUrl?: string;
  author?: string;
  createdAt?: any;
};

interface SidebarProps {
  articles: Article[];
}

const SidebarNews: React.FC<SidebarProps> = ({ articles }) => {
  return (
    <aside className="space-y-6">

      {/* Latest News */}
      <div>
        <h3 className="font-headline font-bold text-lg border-b-2 border-foreground pb-2 mb-4">
          ताज़ा खबरें
        </h3>

        <div className="space-y-4">
          {articles.map((article) => (
            <Link key={article.id} to={`/news/${article.id}`}>
              <article className="flex gap-3 group cursor-pointer pb-3 border-b border-border last:border-0">

                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-20 h-16 object-cover shrink-0 group-hover:opacity-80 transition-opacity"
                  />
                )}

                <div className="min-w-0">

                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent-foreground bg-accent px-1.5 py-0.5">
                    {article.category}
                  </span>

                  <h4 className="text-sm font-headline font-semibold mt-1 leading-snug group-hover:underline line-clamp-2">
                    {article.title}
                  </h4>

                  <span className="news-time">
                    {article.author || "Admin"}
                  </span>

                </div>

              </article>
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
};

export default SidebarNews;