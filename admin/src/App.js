import React from "react";
import Footer from "./components/footer";
import List from "./components/list";

function App() {
  return (
    <div className="App">
      <header className="bg-gray-400 mb-10">
        <h1 className="uppercase flex justify-center p-10 ">Liste over brugere</h1>

        <div className="flex justify-center p-5">
          <label>Sorter:</label>
          <select className="mr-10">
            <option>A-Z</option>
            <option>Id nummer</option>
            <option>Brugerrolle</option>
          </select>
          <label>Filtrer:</label>
          <select>
            <option>Bruger ID</option>
            <option>Navn</option>
            <option>Email</option>
            <option>Brugerrolle</option>
          </select>
        </div>

        <form className="flex justify-center p-4">
          <label>Name</label>
          <input type="text" size="25" placeholder="Jane Doe" required></input>
          <label>Email</label>
          <input type="text" size="25" placeholder="Jane_doe@gmai.com" required></input>
        </form>

        <div className="flex justify-center p-10">
          <button className="bg-green-500 hover:bg-green-300 w-20 rounded-lg w-32">Tilføj bruger</button>
        </div>
      </header>

      <List />
      <Footer />
    </div>
  );
}

export default App;
