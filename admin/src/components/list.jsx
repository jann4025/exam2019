import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import Header from "./header";
import uuidv1 from "uuid/v1";

const baseURL = "https://frontend19-ccb8.restdb.io/rest/user-exam";
const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "x-apikey": "5d88747dfd86cb75861e25ff",
  "cache-control": "no-cache"
};

export default function List() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(baseURL, {
      method: "get",
      headers: headers
    })
      .then(e => e.json())
      .then(e => setPosts(e));
  }, []);

  const deleteTask = id => {
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

  console.log(posts);

  return (
    <>
      <table className="table-auto w-5/6 m-auto">
        <Header />

        <tbody>
          {posts.map(post => {
            return <ListItem key={uuidv1()} deleteTask={deleteTask} user_id={post.user_id} firstname={post.name} lastname={post.lastname} user={post.user} mail={post.email} id={post._id} />;
          })}
        </tbody>
      </table>
    </>
  );
}
