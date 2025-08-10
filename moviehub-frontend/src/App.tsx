import "./App.css";
import CarouselMovie from "./components/ui/CarouselMovie";
import Navbar from "./components/ui/Navbar";
import UserCharacterList from "./components/ui/UserCharacterList";
import UserCharacterDrawer from "./components/ui/UserCharacterDrawer";
import CreatePost from "./components/ui/CreatePost";

import type { Post } from "./types/types";

function App() {
  const handlePostSubmit = (post: Post) => {
    console.log("Post nou:", post);
    // aici vei pune fetch() către backend când vrei să salvezi postarea
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 lg:pr-72 space-y-8">
        <CarouselMovie />
        <CreatePost onPostSubmit={handlePostSubmit}/> {/* Componenta de publicare */}
      </main>
      <UserCharacterList />       {/* Pentru desktop */}
      <UserCharacterDrawer />     {/* Pentru mobil/tabletă */}
    </>
  );
}

export default App;
