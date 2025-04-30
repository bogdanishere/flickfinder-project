import { validatePage } from "@/validation/validatePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SearchMovieForm from "./SearchMovieForm";
import MovieList from "./MovieList";
import Footer from "./Footer";
import { Pagination } from "./Pagination";

type PageProps = {
  params: Promise<{ page: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { page } = await params;

  return {
    title: "FlickFinder page " + page,
    description:
      "Welcome to FlickFinder, the best place to find your favorite movies, TV shows, and more!",

    metadataBase: new URL(`https://flickfinder-project.vercel.app/${page}`),

    openGraph: {
      title: "FlickFinder page " + page,
      description:
        "Welcome to FlickFinder, the best place to find your favorite movies, TV shows, and more!",
      images: [
        {
          url: "https://flickfinder-project.vercel.app/icon.png",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;

  const validPage = validatePage.parse(page);

  if (!validPage || Number.isNaN(validPage.page)) {
    notFound();
  }

  return (
    <header className="relative h-screen w-full p-8">
      <section className="relative h-screen section1">
        <div className="custom-bg min-h-screen w-full">
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 lg:top-[40%]">
            <h1>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-normal tracking-[0.5rem] sm:tracking-[0.75rem] md:tracking-[1rem] lg:tracking-[1.5rem] animate-[moveInLeft_1.5s_ease-out_forwards]">
                FlickFinder
              </span>
              <span className="pt-2 block text-base sm:text-xl md:text-2xl lg:text-[2rem] font-bold tracking-[0.5rem] sm:tracking-[0.75rem] lg:tracking-[1rem] animate-[moveInRight_1.5s_ease-out_forwards]">
                Uncover new stories
              </span>
            </h1>
            <SearchMovieForm />
          </div>
        </div>
      </section>

      <div className=" w-full h-32" />

      <section className="pb-20 w-full">
        <MovieList page={validPage.page} />
        <Pagination page={validPage.page} />
      </section>

      <Footer />
    </header>
  );
}
