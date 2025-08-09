import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Mai multe filme mock
const movies = [
  { title: "Inception", image: "/inception.png" },
  { title: "Interstellar", image: "/interstellar.png" },
  { title: "The Matrix", image: "/matrix.png" },
  { title: "The Godfather", image: "/godfather.jpeg" },
  { title: "Dune", image: "/dune.jpeg" },
  { title: "Oppenheimer", image: "/oppenheimer.jpeg" },
  { title: "Blade Runner 2049", image: "/blade-runner.jpg" },
  { title: "Tenet", image: "/tenet.jpg" },
  { title: "Fight Club", image: "/fight-club.jpeg" },
  { title: "Pulp Fiction", image: "/pulp-fiction.jpg" },
];

export default function CarouselMovie() {
  return (
    <Carousel
      opts={{ align: "start" }}
      className="w-full max-w-7xl mx-auto py-10"
    >
      <CarouselContent>
        {movies.map((movie, index) => (
          <CarouselItem
            key={index}
            className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-3">
              <Card
                className="transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl bg-white/80 backdrop-blur-sm border-b border-gray-300 rounded-b-md"
                style={{ borderTop: "none", borderLeft: "none", borderRight: "none" }}
              >
                <CardContent className="p-0">
                  <div className="h-64 w-full overflow-hidden rounded-t-md">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
