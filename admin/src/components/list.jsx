import React from "react";
import ListItem from "./ListItem";
import Header from "./header";
import uuidv1 from "uuid/v1";

export default function List(props) {
  console.log(props.posts);

  return (
    <>
      <div className="overflow-hidden overflow-x-auto">
        <table className="table-auto lg:w-5/6 m-auto">
          <Header />

          <tbody className="">
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
      </div>
    </>
  );
}
