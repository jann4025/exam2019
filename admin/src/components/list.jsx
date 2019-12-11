import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import Header from "./header";
import uuidv1 from "uuid/v1";

export default function List(props) {
  console.log(props.posts);

  return (
    <>
      <table className="table-auto w-5/6 m-auto sm:w-10/12 ">
        <Header />

        <tbody>
          {props.posts.map(post => {
            return (
              <ListItem
                key={uuidv1()}
                deleteUser={props.deleteUser}
                editUser={props.editUser}
                user_id={post.user_id}
                firstname={post.name}
                lastname={post.lastname}
                user={post.user}
                mail={post.email}
                id={post._id}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}
