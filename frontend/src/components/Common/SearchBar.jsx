import { CgSearchLoading } from "react-icons/cg";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/Collections/all?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? "absolute top-0 left-0 w-full bg-white h-24 z-50"
          : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={HandleSubmit}
          className="relative flex items-center justify-center w-full border-b-2 border-t-[#FF1493] border-t-4 border-b-[#1E3A8A] rounded-full p-2"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
              autoFocus
            />

            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 hover:text-[#FF1493] border-b-[#1E3A8A]" 
              type="submit"
            >
              <CgSearchLoading className="h-6 w-6" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSearchToggle}
            className="ml-3 h-6 w-7 hover:text-[#FF1493]"
          >
            <IoCloseCircle />
          </button>
        </form>
      ) : (
        <button type="button" onClick={handleSearchToggle}>
          <FcSearch className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
