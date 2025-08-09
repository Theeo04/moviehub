import "./App.css";
import CarouselMovie from "./components/ui/CarouselMovie";
import Navbar from "./components/ui/Navbar";
import UserCharacterList from "./components/ui/UserCharacterList";
import UserCharacterDrawer from "./components/ui/UserCharacterDrawer";

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 lg:pr-72">
        <h2 className="text-2xl font-semibold mb-6">Welcome to MovieHub!</h2>
        <CarouselMovie />
      </main>
      <UserCharacterList />       {/* Pentru desktop */}
      <UserCharacterDrawer />     {/* Pentru mobil/tabletă */}
    </>
  );
}

export default App;
