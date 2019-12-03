import React from "react";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="List">
        <div className="Listitem"></div>
      </div>

      {/* <Footer></Footer> */}
    </div>
  );
}

function Header() {
  return (
    <>
      <header>
        <h1 className="uppercase flex justify-center m-10">List of users</h1>
        <ul className="flex flex-row justify-around mt-24">
          <li>Name</li>
          <li>Mail</li>
          <li>User</li>
          <li>User ID</li>
        </ul>
        <div
          className="w-11/12 h-1 bg-black my-auto
        mx-16"
        ></div>
      </header>
    </>
  );
}

// function Footer() {
//   return (
//     <>
//       <footer className=" bg-gray-400 h-20 bottom-0">This is a footer</footer>
//     </>
//   );
// }

export default App;
