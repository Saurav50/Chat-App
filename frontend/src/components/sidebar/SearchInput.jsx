import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import useConversation from "../../store/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [search, setSearch] = useState();
  const { conversations } = useGetConversations();
  const { setSelectedConversation } = useConversation();
  const submitHandler = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) return toast.error("Enter atleast 3 characters");
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };
  return (
    <form onSubmit={submitHandler} className="flex gap-4">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-full  rounded-full"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-circle">
        <IoSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
