import "./App.css";
import { Layout } from "./Layout/Layout";
import { Analytics } from "./components/Analytics";
import { Boxes } from "./components/Boxes";
import { VideoPlayer } from "./components/VideoPlayer";
import { AppContextProvider } from "./context/appContext";

function App() {
  return (
    <AppContextProvider>
      <>
        <Layout>
          <>
            <Boxes />
            <VideoPlayer />
            <Analytics />
          </>
        </Layout>
      </>
    </AppContextProvider>
  );
}

export default App;
