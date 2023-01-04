import { useEffect, useState } from 'react';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn,
    NavBtnLink,
    NavBtnLink1,
} from './NavbarElements';
import { animateScroll as scroll } from 'react-scroll';

function Navbar() {
    const [scrollNav, setScrollNav] = useState();

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav);
    }, []);

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    return (
        <>
            <Nav scrollNav={scrollNav}>
                <NavbarContainer>
                    <NavLogo to="/" onClick={toggleHome}>
                        <img
                            style={{
                                width: '40px',
                            }}
                            src={require('../../../../assets/images/BC_logo.png')}
                            alt=""
                        />
                    </NavLogo>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="home" smooth="true" duration="500" spy="true" exact="true" offset={-80}>
                                Home
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="about" smooth="true" duration="500" spy="true" exact="true" offset={-80}>
                                Về chúng tôi
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="top-donors" smooth="true" duration="500" spy="true" exact="true" offset={-80}>
                                Người hiến máu
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="events" smooth="true" duration="500" spy="true" exact="true" offset={-80}>
                                Sự kiện
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="faq" smooth="true" duration="500" spy="true" exact="true" offset={-80}>
                                Hỏi - Đáp
                            </NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to="/register">Đăng ký</NavBtnLink>
                        <NavBtnLink1 to="/login">Đăng nhập</NavBtnLink1>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    );
}

export default Navbar;
