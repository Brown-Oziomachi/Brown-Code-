"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";

export default function NavbarWrapper({ isScrolled, activeSection, scrollToSection}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            
                    <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            
                        <Navbar                       
                            isScrolled={isScrolled}
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                            activeSection={activeSection}
                            scrollToSection={scrollToSection}
                          />
        </div>
    );
}
