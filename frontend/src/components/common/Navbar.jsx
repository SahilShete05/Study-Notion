import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import "./loader.css";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Could not fetch the category list");
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <div className="flex h-14 items-center justify-center border-b border-b-richblack-700 bg-richblack-900 relative z-50">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} width={160} height={42} loading="lazy" alt="StudyNotion Logo" />
        </Link>

        {/* Desktop Nav */}
        <nav>
          <ul className="hidden md:flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <IoIosArrowDown />
                    <div
                      className={`invisible absolute left-[50%] translate-x-[-49%] 
                      ${subLinks.length ? "translate-y-[15%]" : "translate-y-[40%]"}
                      top-[50%] z-50 flex flex-col rounded-md bg-richblack-5 p-4 
                      text-richblack-900 opacity-0 transition-all duration-200 
                      group-hover:visible group-hover:opacity-100 lg:w-[300px]`}
                    >
                      {subLinks.length ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            to={`catalog/${subLink.name.replace(/\s+/g, "-")}`}
                            key={i}
                            className="rounded-lg bg-transparent py-2 pl-2 hover:bg-richblack-50"
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <span className="loader"></span>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative pr-2">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-0 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null ? (
            <>
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-4 py-2 rounded-md text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-richblack-700 bg-yellow-50 px-4 py-2 rounded-md text-richblack-900 font-semibold">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>

        {/* Hamburger - Mobile */}
        <div
          className="mr-4 md:hidden text-[#AFB2BF] text-2xl cursor-pointer"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <RxHamburgerMenu />
        </div>
      </div>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1000] bg-richblack-900 bg-opacity-95 flex flex-col text-richblack-25 px-8 py-10 overflow-y-auto md:hidden animate-slideDown">
          {/* Close Button */}
          <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-5 right-5 text-3xl text-yellow-50">
      <IoMdClose />
    </button>

    {/* Logo */}
    <div className="flex justify-center mb-10">
      <img src={logo} alt="Logo" width={150} />
    </div>

    {/* Auth Buttons */}
    {token === null && (
      <div className="flex flex-col gap-4 mb-8 px-2">
        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
          <button className="w-full bg-yellow-50 text-richblack-900 py-3 rounded-md font-semibold shadow-md hover:scale-[1.02] transition">
            Login
          </button>
        </Link>
        <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
          <button className="w-full bg-yellow-50 text-richblack-900 py-3 rounded-md font-semibold shadow-md hover:scale-[1.02] transition">
            Signup
          </button>
        </Link>
      </div>
    )}

    {/* Courses */}
    <div className="border-t border-b border-richblack-700 py-4 mb-4">
      <h3 className="text-yellow-50 text-lg font-semibold mb-2">Courses</h3>
      <div className="flex flex-col gap-3">
        {subLinks.length ? (
          subLinks.map((subLink, i) => (
            <Link
              to={`/catalog/${subLink.name.replace(/\s+/g, "-")}`}
              key={i}
              className="text-richblack-50 hover:text-yellow-50 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {subLink.name}
            </Link>
          ))
        ) : (
          <span className="loader"></span>
        )}
      </div>
    </div>

    {/* Other Links */}
    <div className="flex flex-col gap-3 mt-6">
      {NavbarLinks.filter((l) => l.title !== "Catalog").map((link, i) => (
        <Link
          to={link.path}
          key={i}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`hover:text-yellow-50 ${
            matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"
          }`}
        >
          {link.title}
        </Link>
      ))}
    </div>

    {/* Profile / Cart */}
    {token && (
      <div className="mt-8">
        <ProfileDropDown />
      </div>
    )}
  </div>
)}
 
    </div>
  );
};

export default Navbar;
