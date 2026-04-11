import { CiDeliveryTruck, CiUser } from "react-icons/ci";
import { FaMotorcycle, FaRegCreditCard, FaTasks, FaUser } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import UseRole from "../Hooks/UseRole";
import { RiEBikeFill } from "react-icons/ri";
import { SiGoogletasks } from "react-icons/si";
import Logo from "../Components/Logo";

const Dashboard = () => {
  const { role } = UseRole();

  return (
    <div
      className="drawer lg:drawer-open w-screen min-h-screen fixed top-0 left-0"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(15, 23, 42, 0.4), rgba(30, 41, 59, 0.35)), url('https://t3.ftcdn.net/jpg/02/61/05/22/360_F_261052228_JWWd2a1m0bahg7IKqigyS6k2059oSqVc.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative overflow-hidden h-screen flex flex-col">
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Navbar */}
          <nav className="navbar w-full bg-white/10 backdrop-blur-3xl border-b border-white/20 sticky top-0 z-30 px-0 flex-shrink-0">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-gray-100 hover:bg-white/20 ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-2 md:px-4 text-lg md:text-xl font-semibold text-white drop-shadow">
              SwiftParcel Dashboard
            </div>
          </nav>
          {/* Page content here */}
          <div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible z-40">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-white/15 backdrop-blur-3xl border-r border-white/20 is-drawer-close:w-14 is-drawer-open:w-64 relative z-50">
          {/* Sidebar content here */}
          <ul className="menu w-full grow p-3 space-y-1">
            {/* Logo */}
            <li className="mb-4 px-1">
              <Link to="/" className="p-0 hover:bg-transparent">
                <Logo />
              </Link>
            </li>

            {/* Dashboard Home */}
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-lg transition-all px-3 py-2 ${
                    isActive
                      ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                      : "text-gray-300 hover:bg-white/10 border border-transparent"
                  }`
                }
                data-tip="Dashboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden font-medium">
                  Dashboard
                </span>
              </NavLink>
            </li>

            {/* My Parcels */}
            <li>
              <NavLink
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-lg transition-all px-3 py-2 ${
                    isActive
                      ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                      : "text-gray-300 hover:bg-white/10 border border-transparent"
                  }`
                }
                data-tip="My Parcels"
                to="/dashboard/my-parcels"
              >
                <CiDeliveryTruck className="size-5" />
                <span className="is-drawer-close:hidden font-medium">
                  My Parcels
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-lg transition-all px-3 py-2 ${
                    isActive
                      ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                      : "text-gray-300 hover:bg-white/10 border border-transparent"
                  }`
                }
                data-tip="My Profile"
                to="/dashboard/my-profile"
              >
                <CiUser className="size-5" />
                <span className="is-drawer-close:hidden font-medium">
                  My Profile
                </span>
              </NavLink>
            </li>

            {/* Payment History */}
            <li>
              <NavLink
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-lg transition-all px-3 py-2 ${
                    isActive
                      ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                      : "text-gray-300 hover:bg-white/10 border border-transparent"
                  }`
                }
                data-tip="Payment History"
                to="/dashboard/payment-history"
              >
                <FaRegCreditCard className="size-5" />
                <span className="is-drawer-close:hidden font-medium">
                  Payment History
                </span>
              </NavLink>
            </li>

            {/* Rider role */}
            {role === "rider" && (
              <>
                <li className="pt-4 pb-2 is-drawer-close:hidden">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Rider
                  </p>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-lg transition-all px-3 py-2 ${
                        isActive
                          ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                          : "text-gray-300 hover:bg-white/10 border border-transparent"
                      }`
                    }
                    data-tip="Assign Deliveries"
                    to="/dashboard/assign-deliveries"
                  >
                    <FaTasks className="size-5" />
                    <span className="is-drawer-close:hidden font-medium">
                      Assign Deliveries
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-lg transition-all px-3 py-2 ${
                        isActive
                          ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                          : "text-gray-300 hover:bg-white/10 border border-transparent"
                      }`
                    }
                    data-tip="Completed Deliveries"
                    to="/dashboard/completed-deliveries"
                  >
                    <SiGoogletasks className="size-5" />
                    <span className="is-drawer-close:hidden font-medium">
                      Completed Deliveries
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin role */}
            {role === "admin" && (
              <>
                <li className="pt-4 pb-2 is-drawer-close:hidden">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Admin
                  </p>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-lg transition-all px-3 py-2 ${
                        isActive
                          ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                          : "text-gray-300 hover:bg-white/10 border border-transparent"
                      }`
                    }
                    data-tip="Approve Rider"
                    to="/dashboard/approve-rider"
                  >
                    <FaMotorcycle className="size-5" />
                    <span className="is-drawer-close:hidden font-medium">
                      Approve Rider
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-lg transition-all px-3 py-2 ${
                        isActive
                          ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                          : "text-gray-300 hover:bg-white/10 border border-transparent"
                      }`
                    }
                    data-tip="Assign Riders"
                    to="/dashboard/assign-rider"
                  >
                    <RiEBikeFill className="size-5" />
                    <span className="is-drawer-close:hidden font-medium">
                      Assign Riders
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-lg transition-all px-3 py-2 ${
                        isActive
                          ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                          : "text-gray-300 hover:bg-white/10 border border-transparent"
                      }`
                    }
                    data-tip="Users Management"
                    to="/dashboard/users-management"
                  >
                    <FaUser className="size-5" />
                    <span className="is-drawer-close:hidden font-medium">
                      Users Management
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Settings */}
            <li className="mt-auto">
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-lg text-gray-300 hover:bg-white/10 transition-all border border-transparent px-3 py-2"
                data-tip="Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden font-medium">
                  Settings
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
