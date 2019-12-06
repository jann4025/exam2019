import React from "react";
import Footer from "./components/footer";
import List from "./components/list";
import { useState, useEffect } from "react";

const baseURL = "https://frontend19-ccb8.restdb.io/rest/user-exam";
const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "x-apikey": "5d88747dfd86cb75861e25ff",
  "cache-control": "no-cache"
};

export default function App(props) {
  // const [posts, setPosts] = useState([]);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  const nameChanged = e => {
    setName(e.target.value);
  };

  const lastnameChanged = e => {
    setLastname(e.target.value);
  };

  const emailChanged = e => {
    setEmail(e.target.value);
  };

  const userChanged = e => {
    setUser(e.target.value);
  };

  // const onUserAdded = data => {
  //   setPosts(posts.concat(data));
  // };

  const onSubmit = e => {
    e.preventDefault();

    // const onUserAdded = data => {
    //   setPosts(posts.concat(data));
    // };

    fetch(baseURL, {
      method: "post",
      headers: headers,
      body: JSON.stringify({
        name: name,
        lastname: lastname,
        email: email,
        user: user
      })
    })
      .then(e => e.json())
      .then(e => {
        console.log(e);
        // props.onUserAdded(e);
        setName("");
        setLastname("");
        setEmail("");
        setUser("");
      });
  };

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

        <form className="flex justify-center p-10" onSubmit={onSubmit}>
          <label className="mr-2">Fornavn</label>
          <input className="mr-10" type="text" size="25" placeholder="Jane" name="name" onChange={nameChanged} value={name} required></input>

          <label className="mr-2">Efternavn</label>
          <input className="mr-10" type="text" size="25" placeholder="Doe" name="lastname" onChange={lastnameChanged} value={lastname} required></input>

          <label className="mr-2">Email</label>
          <input className="mr-10" type="text" size="25" placeholder="Jane_doe@gmai.com" onChange={emailChanged} name="email" value={email} required></input>

          {/* <label>Brugerrolle</label>
          <select onChange={userChanged} value={props.user} required>
            <option>Admin</option>
            <option>Standard</option>
          </select> */}

          <input className="bg-green-500 hover:bg-green-300 w-20 rounded-lg w-32" type="submit" value="Tilføj bruger" />
        </form>

        {/* <div className="flex justify-center p-10">
          <button className="bg-green-500 hover:bg-green-300 w-20 rounded-lg w-32">Tilføj</button>
        </div> */}

        {/* <div className="flex justify-center p-10">
          <button className="bg-green-500 hover:bg-green-300 w-20 rounded-lg w-32">Tilføj bruger</button>
        </div> */}
      </header>

      <List />
      <Footer />
    </div>
  );
}
