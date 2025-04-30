import Image from "next/image";
import { searchMovieById } from "./actions";
import ButtonBack from "./ButtonBack";

import defaultImage from "@/public/not-found-image.jpg";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { id } = params;

  const data = await searchMovieById(id);

  const title = "Title" in data ? data.Title : `Movie ${id}`;

  const poster =
    "Poster" in data
      ? data.Poster
      : "https://flickfinder-project.vercel.app/icon.png";

  return {
    title,
    description: `Details for ${title}`,

    metadataBase: new URL("https://flickfinder-project.vercel.app"),

    openGraph: {
      title,
      description: `Details for ${title}`,
      images: [
        {
          url: poster,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const data = await searchMovieById(id);

  if (data && "Error" in data) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-medium text-red-500">
        {data.Error}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full custom-bg py-24">
      <div className="px-4 lg:pt-20 sm:px-6 lg:px-8 pt-0">
        <div className="mx-auto max-w-7xl pt-10 lg:pt-16 ">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
            {/* Movie Poster */}
            <div className="relative mx-auto w-full max-w-[320px] lg:mx-0">
              <div className="overflow-hidden rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10">
                <div className="relative aspect-[2/3] w-full h-full">
                  <Image
                    src={
                      data.Poster === "N/A"
                        ? defaultImage
                        : data.Poster
                        ? data.Poster
                        : defaultImage
                    }
                    alt={data.Title || "Movie Poster"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                  />
                </div>
              </div>

              {/* Ratings Badge */}
              {data.imdbRating && (
                <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-center font-bold text-black shadow-lg">
                  <div>
                    <div className="text-lg leading-none">
                      {data.imdbRating}
                    </div>
                    <div className="text-xs opacity-80">IMDb</div>
                  </div>
                </div>
              )}
            </div>

            {/* Movie Details */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {data.Title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
                  <span className="text-xl font-medium">{data.Year}</span>
                  {data.Released && <span>• {data.Released}</span>}
                  {data.Runtime && <span>• {data.Runtime}</span>}
                </div>
              </div>
              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2">
                {data.Genre?.split(", ").map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              {/* Plot */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Overview</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {data.Plot}
                </p>
              </div>
              {/* Details Grid */}
              <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-2">
                {data.Director && data.Director !== "N/A" && (
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Director
                    </h3>
                    <p className="mt-1 text-base">{data.Director}</p>
                  </div>
                )}

                {data.Writer && data.Writer !== "N/A" && (
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Writer
                    </h3>
                    <p className="mt-1 text-base">{data.Writer}</p>
                  </div>
                )}

                {data.Actors && data.Actors !== "N/A" && (
                  <div className="sm:col-span-2">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Cast
                    </h3>
                    <p className="mt-1 text-base">{data.Actors}</p>
                  </div>
                )}

                {data.Awards && data.Awards !== "N/A" && (
                  <div className="sm:col-span-2">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Awards
                    </h3>
                    <p className="mt-1 text-base">{data.Awards}</p>
                  </div>
                )}
              </div>
              {/* Additional Ratings */}
              {data.Ratings && data.Ratings.length > 0 && (
                <div className="mt-2 border-t border-border pt-6">
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Ratings
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {data.Ratings.map((rating) => (
                      <div
                        key={rating.Source}
                        className="flex flex-col items-center rounded-lg bg-white/20 p-3 shadow-sm "
                      >
                        <span className="text-sm text-muted-foreground">
                          {rating.Source}
                        </span>
                        <span className="text-lg font-bold">
                          {rating.Value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <ButtonBack />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
