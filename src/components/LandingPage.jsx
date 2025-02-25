import React, { useEffect, useState } from "react";

import Login from "./Login";

const LandingPage = ({ setUser }) => {
  return (
    <div>
      <Login setUser={setUser} />
    </div>
  );
};

export default LandingPage;
