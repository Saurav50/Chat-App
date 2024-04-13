import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex  sm:h-[450px] md:h-[550px] shadow-md bg-gray-900 rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-4xl bg-opacity-30 ">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
