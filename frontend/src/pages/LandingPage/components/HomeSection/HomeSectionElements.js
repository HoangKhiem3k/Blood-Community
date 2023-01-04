import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';

export const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1024px;
    margin: 0 auto;
    padding: 160px 0 80px 0;
    position: relative;
`;

export const HomeContent = styled.div`
    width: 50%;
    object-fit: cover;
`;

export const HomeH1 = styled.h2`
    color: var(--primary);
    font-size: 5.2rem;
    font-weight: 700;
`;

export const HomeH2 = styled.h3`
    color: var(--text-primary);
    font-size: 3rem;
    font-weight: thin;
    padding: 20px 0;
`;

export const HomeP = styled.p``;

export const HomeBtnWrapper = styled.div`
    margin-top: 40px;
`;
export const HomeImgWrapper = styled.div`
    width: 50%;
`;

export const HomeImg = styled.img`
    width: 100%;
`;
export const Button = styled(LinkR)`
    border-radius: 6px;
    background: linear-gradient(270deg, var(--primary) 0, var(--second) 100%);

    color: white;
    padding: 12px 34px;
    cursor: pointer;
    font-weight: 600;
    border: 2px solid var(--primary);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: white;
        color: var(--primary);
    }

    svg {
        font-size: 2rem;
    }
`;
