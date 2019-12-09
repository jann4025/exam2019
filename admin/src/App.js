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
  const [posts, setPosts] = useState([]);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("Standard");
  const [sort, setSort] = useState("id");
  const [sorted, setSorted] = useState([]);
  const onSort = e => {
    console.log(e.target.value);
    const copy = [...posts];
    copy.sort(function(a, b) {
      var nameA = a[e.target.value]; // ignore upper and lowercase
      var nameB = b[e.target.value]; // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    console.log("ramt");
    setSorted(copy);
  };
  useEffect(() => {
    fetch(baseURL, {
      method: "get",
      headers: headers
    })
      .then(e => e.json())
      .then(e => {
        setPosts(e);

        const copy = [...e];
        copy.sort(function(a, b) {
          var nameA = a["name"]; // ignore upper and lowercase
          var nameB = b["name"]; // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        console.log("ramt");
        setSorted(copy);
      });
  }, []);

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

  const onSubmit = e => {
    e.preventDefault();

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
        onUserAdded(e);
        setName("");
        setLastname("");
        setEmail("");
        setUser("");
      });
  };
  const onUserAdded = data => {
    setPosts(posts.concat(data));
  };
  const deleteUser = id => {
    console.log(id);
    const newPosts = posts.filter(post => {
      if (post._id != id) {
        return post;
      }
    });
    setPosts(newPosts);

    fetch(baseURL + "/" + id, {
      method: "delete",
      headers: headers
    })
      .then(e => e.json())
      .then(e => {
        console.log(e);
      });
  };

  return (
    <div className="App">
      <header className="bg-gray-400 mb-10">
        <h1 className="uppercase flex justify-center p-10 ">Liste over brugere</h1>

        <div className="flex justify-center p-5">
          <label>Sorter:</label>
          <select className="mr-10" onChange={onSort}>
            <option value="name">A-Z</option>
            <option value="user_id">Id nummer</option>
            <option value="user">Brugerrolle</option>
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

          <label>Brugerrolle</label>
          <select onChange={userChanged} value={user} required>
            <option>Admin</option>
            <option>Standard</option>
          </select>

          <input className="bg-green-500 hover:bg-green-300 w-20 rounded-lg w-32" type="submit" value="Tilføj bruger" />
        </form>

        {/* <div className="flex justify-center p-10">
          <button className="bg-green-500 hover:bg-green-300 w-20 rounded-lg w-32">Tilføj</button>
        </div> */}

        {/* <div className="flex justify-center p-10">
          <button className="bg-green-500 hover:bg-green-300 w-20 rounded-lg w-32">Tilføj bruger</button>
        </div> */}
      </header>

      <List posts={sorted} deleteUser={deleteUser} />
      <Footer />
    </div>
  );
}
