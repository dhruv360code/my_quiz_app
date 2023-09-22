import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedEmails = localStorage.getItem("emails");
    if (storedEmails) {
      setEmailList(JSON.parse(storedEmails));
    }
  }, []);

  const handleEmailSubmit = () => {
    if (email.trim() !== "") {
      // Add the new email to the list
      const updatedEmailList = [...emailList, email];
      setEmailList(updatedEmailList);

      // Store the updated email list in local storage
      localStorage.setItem("emails", JSON.stringify(updatedEmailList));

      // Clear the input field
      setEmail("");
      navigate("/quiz");
    }
  };

  return (
    <div
      className="relative pt-16 pb-32 flex content-center items-center justify-center"
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage:
            "radial-gradient(circle at top right, rgb(13, 141, 190) 0%, rgb(13, 141, 190) 46%,rgb(22, 153, 204) 46%, rgb(22, 153, 204) 49%,rgb(31, 166, 217) 49%, rgb(31, 166, 217) 52%,rgb(40, 178, 231) 52%, rgb(40, 178, 231) 54%,rgb(49, 190, 244) 54%, rgb(49, 190, 244) 100%)",
        }}
      >
        <span id="blackOverlay" className="w-full h-full "></span>
      </div>
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="pr-12">
              <h1 className="text-white font-semibold text-5xl">
                Hi Ready to test your knowledge?
              </h1>
              <p className="mt-4 text-lg text-white">
                Enter your email to get started
              </p>
            </div>
            <div className=" px-8 pt-6 pb-8 mb-4">
              <input
                type="email"
                placeholder="johndoe@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-[1/2] py-2 px-3 m-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <div className="flex m-2 items-center justify-center">
                <button
                  onClick={handleEmailSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
