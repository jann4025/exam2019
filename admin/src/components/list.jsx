import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import Header from "./header";
import uuidv1 from "uuid/v1";

export default function List() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const baseURL = "https://frontend19-ccb8.restdb.io/rest/user-exam";
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d88747dfd86cb75861e25ff",
      "cache-control": "no-cache"
    };
    fetch(baseURL, {
      method: "get",
      headers: headers
    })
      .then(e => e.json())
      .then(e => setPosts(e));
  }, []);

  return (
    <>
      <table className="table-auto w-5/6 m-auto">
        <Header />

        <tbody>
          {posts.map(post => {
            return <ListItem key={uuidv1()} user_id={post.user_id} firstname={post.name} lastname={post.lastname} user={post.user} mail={post.email} />;
          })}
        </tbody>
      </table>
    </>
  );
}
