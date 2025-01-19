import { UserIcon, PassIcon, SubmitIcon } from "../components/icons";
import { useState } from "react";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  //   const loginHandler = async (e) => {
  //     e.prevetDefault();
  //     const { username, password } = data;
  //     try {
  //       const response = await axios.post("/login", { username, password });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <div className="bg-primary h-dvh flex justify-center items-center text-white">
      <div className="xs:w-[70%] lg:w-[50%] xs:h-1/2  lg:h-3/5 bg-accent rounded-md p-3 flex justify-center items-center flex-col">
        <h1 className="text-2xl">Login</h1>

        <div className="flex flex-col items-center gap-6 mt-5">
          <div className="flex gap-2 border-[1px] p-1 border-primary rounded-md items-center justify-center">
            <UserIcon />
            <input
              className="py-1 bg-transparent"
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
          <div
            className="flex gap-2 border-[1px] p-1 border-primary 
                     rounded-md items-center justify-center"
          >
            <PassIcon />
            <input
              className="py-1 bg-transparent"
              type="text"
              name="password"
              id="password"
              placeholder="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div>
            <button
              className="bg-highlight flex items-center px-4 py-1 rounded-md"
              onClick={console.log("hello")}
            >
              <SubmitIcon />
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
