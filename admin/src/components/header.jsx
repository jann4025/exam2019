import React from "react";

export default function Header(props) {
  return (
    <>
      <thead className=" bg-gray-400 ">
        <tr className="">
          <th className="text-left p-4 ">Bruger ID</th>
          <th className="text-left">Navn/Email/Brugerrolle</th>
          <th></th>
          {/* <th className="text-left">Email</th> */}
          {/* <th className="text-left">Brugerrolle</th> */}
        </tr>
      </thead>
    </>
  );
}
