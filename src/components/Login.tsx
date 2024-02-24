import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import "../css/Login.css";

import { useNavigate } from "react-router-dom";
import { useLoginQuery } from "../queries/authentication";
const Login: React.FC = () => {
  const [checked1, setChecked1] = useState<boolean>(false);
  const navigate = useNavigate();

<<<<<<< HEAD
 const check = () =>{
  if("shaswat data check kare to"){
    navigate("/");
  }
  else{
    navigate("/login");
  }
 }
=======
  const { mutate: login, isPending: isLoginPending } = useLoginQuery();
  const handleLoginSubmit = () => {
    if (isLoginPending) return;
    login({ email: "shashwatpatel04@gmail.com", password: "Skpatel@1203" });
  };

  const check = () => {
    if ("shaswat data check kare to") {
      navigate("/main");
    } else {
      navigate("/login");
    }
  };
>>>>>>> 6526f81cc46f2f2d388ce3e940f7b004a3f009f3
  return (
    <>
      <div className="main">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Baps_logo.svg/1200px-Baps_logo.svg.png"
              alt="hyper"
              height={50}
              className="mb-3"
            />
            <div className="text-900 text-3xl font-medium mb-3">
              Welcome Back
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">
              Email
            </label>
            <InputText
              id="email"
              type="text"
              placeholder="Email address"
              className="w-full mb-3"
            />

            <label
              htmlFor="password"
              className="block text-900 font-medium mb-2"
            >
              Password
            </label>
            <InputText
              type="password"
              placeholder="Password"
              className="w-full mb-3"
            />

            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <Checkbox
                  id="rememberme"
                  className="mr-2"
                  checked={checked1}
                  onChange={(e) => setChecked1(e.checked as boolean)}
                />
                <label htmlFor="rememberme">Remember me</label>
              </div>
            </div>

            <Button
              // onClick={check}
              disabled={isLoginPending}
              onClick={handleLoginSubmit}
              label="Sign In"
              icon="pi pi-user"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
