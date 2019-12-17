import React from "react";

export default function Header(props) {
  return (
    <>
      <thead className=" bg-gray-400 ">
        <tr className="h-20">
          <th className="text-left p-4 ">Bruger ID</th>
          <th className="text-left">
            <strong className="block">Navn</strong>
            <small className="block">Email</small>
            <small className="block">Brugerrolle</small>
          </th>
          <th></th>
          {/* <th className="text-left">Email</th> */}
          {/* <th className="text-left">Brugerrolle</th> */}
        </tr>
      </thead>
    </>
  );
}
