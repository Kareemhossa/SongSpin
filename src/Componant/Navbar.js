import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ setLibaryStatus, libaryStatus }) => {
  return (
    <div>
      <nav>
        <h1>Wave </h1>
        <button onClick={() => setLibaryStatus(!libaryStatus)}>
          Libaray <FontAwesomeIcon icon={faMusic} />
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
