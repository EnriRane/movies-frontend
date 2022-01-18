import React from "react";

const ListGroup = (props) => {
  return (
    <ul className="list-group">
      {props.items.map((item) => (
        <li
          key={item.name}
          className={
            props.selectedItem === item
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => props.onItemSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
