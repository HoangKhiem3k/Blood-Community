import { ArrowForward, ArrowRight } from '@mui/icons-material';
import { useState } from 'react';
import DonateBox from '../DonateBox';
import {
    HomeContainer,
    HomeContent,
    HomeH1,
    HomeH2,
    HomeP,
    HomeBtnWrapper,
    HomeImg,
    Button,
    HomeImgWrapper,
} from './HomeSectionElements';

function HomeSection() {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };

    return (
        <HomeContainer id="home">
            <HomeContent>
                <HomeH1>Blood Community</HomeH1>
                <HomeH2>Đặt lịch hẹn hiến máu cứu người!</HomeH2>
                <HomeP>Mỗi giọt máu cho đi, một cuộc đời ở lại!</HomeP>
                <HomeP>
                    Với mỗi lần hiến máu bạn có thể mang lại cơ hội cứu sống 3 người. Hãy cứu lấy mạng người bằng ít máu
                    của mình!
                </HomeP>

                <HomeBtnWrapper>
                    <Button to="/register" onMouseEnter={onHover} onMouseLeave={onHover}>
                        Bắt đầu {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </HomeBtnWrapper>
            </HomeContent>
            <HomeImgWrapper>
                <HomeImg src={require('../../../../assets/images/landingpage.png')} alt="landingpage" />
            </HomeImgWrapper>
            {/* <DonateBox position='absolute'/> */}
        </HomeContainer>
    );
}

export default HomeSection;
