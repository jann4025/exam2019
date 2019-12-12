import React from "react";

export default function Header(props) {
  return (
    <>
      <thead>
        <tr className="">
          <th className="text-left ">Bruger ID</th>
          <th className="text-left">Navn</th>
          <th className="text-left">Email</th>
          <th className="text-left">Brugerrolle</th>
        </tr>
      </thead>
    </>
  );
}
