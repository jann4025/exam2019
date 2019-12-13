import React from "react";

export default function ListItem(props) {
  return (
    <tr className="hover:bg-grey-200">
      <td className="w-30 p-6">{props.user_id}</td>
      <td className="w-64 p-4 ">
        <strong className="block">
          {props.firstname} {props.lastname}
        </strong>
        <small className="block">{props.mail}</small>
        <small className="block">{props.user}</small>
      </td>

      <td>
        <button
          className="text-red-600 m-4 hover:text-gray-300 "
          onClick={() => {
            props.deleteUser(props.id);
          }}
        >
          Slet
        </button>
        <button
          className="text-gray-900 m-4 hover:text-gray-300"
          onClick={() => {
            props.editUser(props);
          }}
        >
          Rediger
        </button>
      </td>
    </tr>
  );
}
