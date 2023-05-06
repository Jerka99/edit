import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { MyContextComp } from "./components/MyContext";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Popis from "./components/Popis/Popis";
import Donacije from "./components/Donacije";
import Obavijesti from "./components/Obavijesti";
import Unos from "./components/Unos";
import Sign from "./components/Sign";
import { auth } from "./firebase/firebase";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [sidebar, setSidebar] = useState(false);
  const initial = { signUp: false, signIn: false };
  const [displaySign, setDisplaySign] = useState(initial);
  const [user, setUser] = useState("")

  console.log(auth.currentUser);

  const checker = (x) => {
    setUser(x)
  };

  return (
    <div className="App">
      <MyContextComp checker={checker}>
        {displaySign.signIn && !user ? (
          <Sign
            signIn={true}
            signUp={false}
            setDisplaySign={setDisplaySign}
            state={{ email: "", password: "" }}
          />
        ) : null}
        {displaySign.signUp && !user ?(
          <Sign
            signIn={false}
            signUp={true}
            setDisplaySign={setDisplaySign}
            state={{ name: "", email: "", password: "" }}
          />
        ) : null}

        <Navigation
          sidebar={sidebar}
          setSidebar={setSidebar}
          setDisplaySign={setDisplaySign}
        />
        <div className={`mainbody ${sidebar ? "active" : ""}`}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/popis" element={<Popis />} />
            <Route path="/donacije" element={<Donacije />} />
            <Route path="/obavijesti" element={<Obavijesti />} />
            
            <Route path="/unos" element={<ProtectedRoute><Unos prop={"post"}/></ProtectedRoute>} />
          </Routes>
        </div>
      </MyContextComp>
    </div>
  );
}
export default App;
