import React from "react";

export default function ListItem(props) {
  return (
    <tr>
      <td>{props.user_id}</td>
      <td>
        {props.firstname} {props.lastname}
      </td>
      <td>{props.mail}</td>
      <td>{props.user}</td>
      <td>
        <button
          className="bg-red-500 hover:bg-red-300 w-20 rounded-lg m-4"
          onClick={() => {
            props.deleteUser(props.id);
          }}
        >
          Slet
        </button>
        <button
          className="bg-gray-400 hover:bg-gray-300 w-20 rounded-lg m-4"
          // onClick={() => {
          //   props.data(props.id);
          // }}
        >
          Rediger
        </button>
      </td>
    </tr>
  );
}
