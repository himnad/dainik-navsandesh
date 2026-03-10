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

interface HeroStoryProps {
  article: Article;
}

const HeroStory: React.FC<HeroStoryProps> = ({ article }) => {
  return (
    <Link to={`/news/${article.id}`}>
      <article className="group cursor-pointer">

        <div className="relative overflow-hidden aspect-[16/9]">

          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/90 to-transparent p-6">

            <span className="category-label mb-3 inline-block">
              {article.category}
            </span>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-headline font-bold text-primary-foreground leading-tight mb-2">
              {article.title}
            </h2>

            {article.subtitle && (
              <p className="text-sm text-primary-foreground/80 hidden md:block">
                {article.subtitle}
              </p>
            )}

          </div>

        </div>

        <div className="pt-3 border-b border-border pb-4">

          <p className="text-foreground/80 text-sm leading-relaxed line-clamp-3">
            {article.content?.slice(0, 150)}...
          </p>

          <div className="flex items-center gap-3 mt-2">

            {article.author && (
              <span className="text-xs font-semibold text-foreground">
                {article.author}
              </span>
            )}

          </div>

        </div>

      </article>
    </Link>
  );
};

export default HeroStory;