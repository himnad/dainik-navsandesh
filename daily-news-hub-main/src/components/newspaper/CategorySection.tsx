import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  category: string;
  imageUrl?: string;
  author?: string;
  createdAt?: any;
  excerpt?: string;
  time?: string;
}

interface CategorySectionProps {
  title: string;
  articles: Article[];
}

const CategorySection = ({ title, articles }: CategorySectionProps) => {

  if (!articles || articles.length === 0) return null;

  const lead = articles[0];
  const rest = articles.slice(1);

  return (
    <section>
      <h2 className="font-headline font-bold text-xl border-b-2 border-foreground pb-2 mb-4">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Lead Article */}
        <Link
          to={`/news/${lead.id}`}
          className="md:col-span-1 group cursor-pointer"
        >

          {lead.imageUrl && (
            <img
              src={lead.imageUrl}
              alt={lead.title}
              className="w-full aspect-[4/3] object-cover mb-3 group-hover:opacity-90 transition-opacity"
              loading="lazy"
            />
          )}

          <span className="category-label">{lead.category}</span>

          <h3 className="font-headline font-bold text-lg mt-2 leading-snug group-hover:underline">
            {lead.title}
          </h3>

          {lead.excerpt && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {lead.excerpt}
            </p>
          )}

          {lead.time && (
            <span className="news-time mt-1 block">
              {lead.time}
            </span>
          )}

        </Link>

        {/* Other Articles */}
        <div className="md:col-span-2 space-y-4">

          {rest.map((article) => (

            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="block group cursor-pointer pb-4 border-b border-border last:border-0"
            >

              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {article.category}
              </span>

              <h3 className="font-headline font-semibold text-base mt-1 group-hover:underline">
                {article.title}
              </h3>

              {article.excerpt && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {article.excerpt}
                </p>
              )}

              {article.time && (
                <span className="news-time mt-1 block">
                  {article.time}
                </span>
              )}

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
};

export default CategorySection;