import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';

export const Nav = styled.nav`
    background: ${({ scrollNav }) => (scrollNav ? '#fff' : 'transparent')};
    height: 80px;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-item: center;
    font-size: 1.4rem;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 1px solid #fffde3;
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`;

export const NavLogo = styled(LinkR)`
    ${'' /* color: var(--text-primary); */}
    color: black;
    justify-seft: flex-start;
    cursor: pointer;
    font-size: 2.4rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;
`;

export const NavItem = styled.li`
    height: 80px;
`;

export const NavLinks = styled(LinkS)`
    ${'' /* color: var(--text-primary); */}
    color: black;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0rem 1.6rem;
    height: 100%;
    cursor: pointer;
    font-weight: 600;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        opacity: 0;
        height: 5px;
        background-color: var(--primary);
    }
    &.active {
        &::after {
            transition: all 0.3s ease-in-out;
            width: 100%;
            opacity: 1;
        }
    }
    ${
        '' /* &:hover {
        &::after {
            transition: all 0.3s ease-in-out;
            width: 100%;
            opacity: 1;
        }
    } */
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
`;

export const NavBtnLink1 = styled(LinkR)`
    border-radius: 6px;
    background: linear-gradient(270deg, var(--primary) 0, var(--second) 100%);
    white-space: nowrap;
    padding: 8px 14px;
    color: #fff;
    font-size: 1.4rem;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    font-weight: 600;
    border: 1px solid var(--primary);

    &:hover {
        transition: all 0.2s ease-in-out;
        background: white;
        color: var(--primary);
        ${'' /* border: 1px solid var(--primary); */};
    }
`;

export const NavBtnLink = styled(LinkR)`
    border-radius: 6px;
    background: white;
    white-space: nowrap;
    padding: 8px 14px;

    color: #25a4ad;
    font-size: 1.4rem;
    outline: none;
    border: 1px solid #25a4ad;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    font-weight: 600;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: linear-gradient(270deg, #70efd1 0, #25a4ad 100%) !important ;
        border: 1px solid transparent;

        color: white;
    }
    margin: 0 10px;
`;
