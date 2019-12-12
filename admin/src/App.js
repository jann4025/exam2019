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
  const [sort, setSort] = useState("user_id");
  const [filter, setFilter] = useState("Alle");

  const onSort = e => {
    setSort(e.target.value);
  };

  const onFilter = e => {
    setFilter(e.target.value);
  };

  // GET METHOD
  useEffect(() => {
    fetch(baseURL, {
      method: "get",
      headers: headers
    })
      .then(e => e.json())
      .then(e => {
        setPosts(e);
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

  // POST METHOD
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

  // DELETE METHOD
  const deleteUser = id => {
    console.log(id);
    const newPosts = posts.filter(post => {
      if (post._id !== id) {
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

  // PUT METHOD

  const editUser = id => {
    console.log("edit user firing" + id);

    fetch(baseURL + "/" + id, {
      method: "put",
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

  //sort
  //FRA MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  let copy = [...posts];

  copy.sort(function(a, b) {
    var nameA = a[sort]; // ignore upper and lowercase
    var nameB = b[sort]; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  //filter
  copy = copy.filter(post => {
    if (filter === "Alle") {
      return true;
    } else {
      return post.user === filter;
    }
  });

  return (
    <div className="App">
      <header className="bg-gray-400 mb-10">
        <h1 className="uppercase flex justify-center p-10">Liste over brugere</h1>

        <div className="flex justify-center p-5 ">
          <label>Sorter:</label>
          <select className="mr-10" value={sort} onChange={onSort}>
            <option value="name">A-Z</option>
            <option value="user_id">Id nummer</option>
            <option value="user">Brugerrolle</option>
          </select>
          <label>Filtrer:</label>
          <select value={filter} onChange={onFilter}>
            <option>Alle</option>
            <option>Admin</option>
            <option>Standard</option>
          </select>
        </div>

        <form className="flex flex-col justify-center items-center   md:m-auto" onSubmit={onSubmit}>
          <label className="mr-1">Fornavn</label>
          <div className="m-4">
            <input className="mr-4 w-48" type="text" size="25" placeholder="Jane" name="name" onChange={nameChanged} value={name} required></input>
          </div>

          <label className="mr-1">Efternavn</label>
          <div className="m-4">
            <input className="mr-4 w-48" type="text" size="25" placeholder="Doe" name="lastname" onChange={lastnameChanged} value={lastname} required></input>
          </div>

          <label className="mr-1">Email</label>
          <div className="m-4">
            <input className="mr-4 w-48" type="text" size="25" placeholder="Jane_doe@gmail.com" onChange={emailChanged} name="email" value={email} required></input>
          </div>

          <label className="mr-1">Brugerrolle</label>
          <div className="m-4">
            <select className="mr-4 w-48" onChange={userChanged} value={user} required>
              <option>Admin</option>
              <option>Standard</option>
            </select>
          </div>
          <button
            className=" bg-blue-500 hover:bg-blue-300 w-20 rounded-lg w-32
          m-4 "
          >
            Gem
          </button>
          <input
            className="bg-green-500 hover:bg-green-300 w-20 rounded-lg w-32
          m-6"
            type="submit"
            value="Tilføj bruger"
          />
        </form>
      </header>

      <List posts={copy} deleteUser={deleteUser} editUser={editUser} />
      <Footer />
    </div>
  );
}
