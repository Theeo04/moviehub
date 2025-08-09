import "./App.css";
import CarouselMovie from "./components/ui/CarouselMovie";
import Navbar from "./components/ui/Navbar";
import UserCharacterList from "./components/ui/UserCharacterList";
import UserCharacterDrawer from "./components/ui/UserCharacterDrawer";

function App() {
  return (
    <>
      <Navbar />
      <h1>Hello World!</h1>
      <main className="container mx-auto px-4 py-6 lg:pr-72">
        <CarouselMovie />
      </main>
      <UserCharacterList />       {/* Pentru desktop */}
      <UserCharacterDrawer />     {/* Pentru mobil/tabletă */}
    </>
  );
}

export default App;
