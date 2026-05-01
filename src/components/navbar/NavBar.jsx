"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, Mail, LogOut } from "lucide-react"; // Added LogOut icon
import { useRouter } from "next/navigation";
import styles from "@/styles/navbar/NavBar.module.css";

// Updated links for your new app structure
const navLinks = [
  { name: "Home", path: "/" },
  { 
    name: "Destinations", 
    path: "#",
    categories: [] // Add sub-links here later if needed
  },
  { 
    name: "Tours", 
    path: "#",
    categories: [] 
  },
  { name: "Blog", path: "#" },
  { name: "Contact", path: "#" },
];

const NavBar = () => {
  const [isSidebarOpen, setSidebar] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
    setExpandedGroup(null);
  };

  const toggleGroup = (name) => {
    setExpandedGroup(expandedGroup === name ? null : name);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.nav}>
      {/* Desktop Navbar */}
      <ul className={styles.navList}>
        {/* Logo - Kept exactly as requested */}
        <li className={styles.logoItem}>
          <Link href="/">
            <div className={styles.logoWrapper}>
              <Image 
                src="/logo.png"
                alt="Logo"
                fill
                sizes="140px"
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>
        </li>

        {/* Updated Main Navigation Links */}
        <div className={styles.centerLinks}>
          {navLinks.map((link) => (
            <li key={link.name} className={styles.travelDropdown}>
              <Link href={link.path} className={styles.travelLink}>
                {link.name} 
                {link.categories?.length > 0 && <span className={styles.dropdownArrow}>▼</span>}
              </Link>
              
              {/* Dropdown logic kept in case you add categories later */}
              {link.categories?.length > 0 && (
                <ul className={styles.dropdownMenu}>
                  {link.categories.map((cat) => (
                    <li key={cat.name}>
                      <Link href={`${link.path}/${cat.path}`} className={styles.travelLink}>
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </div>

        {/* Right-side icons: Login/Logout */}
        <div className={styles.rightLinks}>
          <li>
            <Link href="#" title="Login" className={styles.iconLink}>
              <User size={20} color="#102533" />
            </Link>
          </li>
        </div>

        {/* Mobile Menu Button */}
        <li className={styles.menuButton}>
          <button onClick={toggleSidebar} className={styles.navIconButton} aria-label="Menu">
            {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </li>
      </ul>

      {/* Sidebar for mobile */}
      {isSidebarOpen && (
        <ul className={styles.sidebar}>
          <li className={styles.closeButton}>
            <button onClick={toggleSidebar} className={styles.navIconButton}>
              <X size={26} />
            </button>
          </li>

          {navLinks.map((link) => (
            <li key={link.name} className={styles.mobileNavItem}>
              <div className={styles.mobileLinkWrapper}>
                <Link
                  href={link.path}
                  className={styles.navLink}
                  onClick={() => setSidebar(false)}
                >
                  {link.name}
                </Link>

                {link.categories?.length > 0 && (
                  <button 
                    onClick={() => toggleGroup(link.name)} 
                    className={styles.mobileArrowBtn}
                  >
                    <span className={expandedGroup === link.name ? styles.rotateArrow : ""}>
                      ▼
                    </span>
                  </button>
                )}
              </div>

              {link.categories?.length > 0 && expandedGroup === link.name && (
                <ul className={styles.mobileDropdown}>
                  {link.categories.map((cat) => (
                    <li key={cat.name}>
                      <Link
                        href={`${link.path}/${cat.path}`}
                        className={styles.navLink}
                        onClick={() => setSidebar(false)}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {/* Mobile Login/Logout */}
          <hr style={{ border: '0.5px solid rgba(0,0,0,0.1)', width: '100%' }} />
          <li>
            <Link href="#" className={styles.navLink} onClick={() => setSidebar(false)}>Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
