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
  const [formState, setFormState] = useState("Tilføj");
  const [user_id, setUserId] = useState("");
  const [id, setId] = useState("");
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
    if (formState === "post") {
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
    } else if (formState === "Gem") {
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
          //onUserAdded(e);
          setName("");
          setLastname("");
          setEmail("");
          setUser("");
          setId("");
          setFormState("post");
          window.location = "";
        });
    }
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

  const editUser = data => {
    console.log("edit user firing", data);
    console.count("state");
    setName(data.firstname);
    console.count("state");
    setLastname(data.lastname);
    console.count("state");
    setEmail(data.mail);
    console.count("state");
    setUser(data.user);
    setFormState("Gem");
    setUserId(data.user_id);
    setId(data.id);
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
      <header className="bg-gray-300 mb-10">
        <h1 className="flex justify-center py-6 text-xl font-semibold">Liste over brugere</h1>

        <div className="flex justify-center lg:flex-row resp:flex-col ">
          <label className="mx-2 resp:m-auto">Sorter:</label>
          <select className="mr-4 h-6 w-30 shadow-xl resp:w-32 resp:m-auto" value={sort} onChange={onSort}>
            <option value="name">A-Z</option>
            <option value="user_id">Id nummer</option>
            <option value="user">Brugerrolle</option>
          </select>
          <label className="mx-2 resp:m-auto">Filtrer:</label>
          <select className="h-6 shadow-xl resp:w-32 resp:m-auto" value={filter} onChange={onFilter}>
            <option>Alle</option>
            <option>Admin</option>
            <option>Standard</option>
          </select>
        </div>

        <form className="flex flex-col justify-center items-center  md:flex-col md:m-auto" onSubmit={onSubmit}>
          <label className="mr-1 my-2">Fornavn</label>
          <div>
            <input className="mr-4 w-48 h-8   rounded-sm shadow-xl" type="text" size="25" placeholder="Jane" name="name" onChange={nameChanged} value={name} required></input>
          </div>

          <label className="mr-1 my-2">Efternavn</label>
          <div>
            <input className="mr-4 w-48 h-8 rounded-sm shadow-xl" type="text" size="25" placeholder="Doe" name="lastname" onChange={lastnameChanged} value={lastname} required></input>
          </div>

          <label className="mr-1 my-2">Email</label>
          <div>
            <input className="mr-4 w-48 h-8 rounded-sm shadow-xl" type="text" size="25" placeholder="Jane_doe@gmail.com" onChange={emailChanged} name="email" value={email} required></input>
          </div>

          <label className="mr-1 my-2">Brugerrolle</label>
          <div>
            <select className="mr-4 w-48 h-8 shadow-xl " onChange={userChanged} value={user} required>
              <option value="Admin">Admin</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
          {/* <button
            className=" bg-blue-500 hover:bg-blue-300 w-20 rounded-lg w-32
          m-4 "
          >
            Gem
          </button> */}
          <input
            className="bg-transparent hover:bg-white w-20 font-bold h-8 shadow-xl rounded-lg w-32
          m-6 border-2 border-solid border-white"
            type="submit"
            value={formState}
          />
        </form>
      </header>

      <List posts={copy} deleteUser={deleteUser} editUser={editUser} />
      <Footer />
    </div>
  );
}
