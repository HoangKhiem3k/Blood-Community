import { Buffer } from 'buffer';
Buffer.from('anything', 'base64');
export const topDonors = [
    {
        id: 1,
        fullname: 'Trần Anh Quân',
        gender: 'Nam',
        district: 'Hải Châu',
        city: 'Đà Nẵng',
        numberOfDonation: 10,
        image: require('../assets/images/aboutus.jpeg'),
    },
    {
        id: 2,
        fullname: 'Lê Đỗ Hoàng Khiêm',
        gender: 'Nam',
        district: 'Hải Châu',
        city: 'Đà Nẵng',
        numberOfDonation: 8,
        image: require('../assets/images/aboutus.jpeg'),
    },
    {
        id: 3,
        fullname: 'Ngô Thị Thu Thảo',
        gender: 'Nữ',
        district: 'Hải Châu',
        city: 'Đà Nẵng',
        numberOfDonation: 7,
        image: require('../assets/images/aboutus.jpeg'),
    },
    {
        id: 4,
        fullname: 'Hồ Quang Huy',
        gender: 'Nam',
        district: 'Hải Châu',
        city: 'Đà Nẵng',
        numberOfDonation: 5,
        image: require('../assets/images/aboutus.jpeg'),
    },
];

export const events = [
    {
        eventId: 1,
        nameEvent: 'Hiến máu nhân đạo',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        date: '03/10/2022',
        location: 'Bệnh viện C Đà Nẵng',
        imageFromHospital: require('../assets/images/aboutus.jpeg'),
    },
    {
        eventId: 2,
        nameEvent: 'Hiến máu nhân đạo',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        date: '03/10/2022',
        imageFromHospital: require('../assets/images/aboutus.jpeg'),
        location: 'Bệnh viện C Đà Nẵng',
    },
    {
        eventId: 3,
        nameEvent: 'Hiến máu nhân đạo',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        date: '03/10/2022',
        imageFromHospital: require('../assets/images/aboutus.jpeg'),
        location: 'Bệnh viện C Đà Nẵng',
    },
    {
        eventId: 4,
        nameEvent: 'Hiến máu nhân đạo',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        date: '03/10/2022',
        imageFromHospital: require('../assets/images/aboutus.jpeg'),
        location: 'Bệnh viện C Đà Nẵng',
    },
];

export const faq = [
    {
        id: 1,
        question: 'Ai có thể tham gia hiến máu?',
        answer: [
            '- Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến máu của mình để cứu chữa người bệnh.',
            '- Cân nặng ít nhất là 45kg đối với phụ nữ, nam giới. Lượng máu hiến mỗi lần không quá 9ml/kg cân nặng và không quá 500ml mỗi lần.',
            '- Không bị nhiễm hoặc không có các hành vi lây nhiễm HIV và các bệnh lây nhiễm qua đường truyền máu khác.',
            '- Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ.',
            '- Có giấy tờ tùy thân.',
        ],
    },
    {
        id: 2,
        question: 'Ai là người không nên hiến máu?',
        answer: [
            '- Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm HIV, viêm gan B, viêm gan C, và các vius lây qua đường truyền máu.',
            '- Người có các bệnh mãn tính: tim mạch, huyết áp, hô hấp, dạ dày…',
        ],
    },
    {
        id: 3,
        question: 'Quyền lợi đối với người hiến máu tình nguyện?',
        answer: [
            'Quyền lợi và chế độ đối với người hiến máu tình nguyện theo Thông tư số 05/2017/TT-BYT Quy định giá tối đa và chi phí phục vụ cho việc xác định giá một đơn vị máu toàn phần, chế phẩm máu đạt tiêu chuẩn:',
            '- Được khám và tư vấn sức khỏe miễn phí.',
            '- Được kiểm tra và thông báo kết quả các xét nghiệm máu (hoàn toàn bí mật): nhóm máu, HIV, virut viêm gan B, virut viêm gan C, giang mai, sốt rét. Trong trường hợp người hiến máu có nhiễm hoặc nghi ngờ các mầm bệnh này thì sẽ được Bác sỹ mời đến để tư vấn sức khỏe.',
            '- Được bồi dưỡng và chăm sóc theo các quy định hiện hành:',

            '+ Phục vụ ăn nhẹ tại chỗ: tương đương 30.000 đồng.',
            '+ Hỗ trợ chi phí đi lại (bằng tiền mặt): 50.000 đồng.',
            '+ Lựa chọn nhận quà tặng bằng hiện vật có giá trị như sau:',
            'Một đơn vị máu thể tích 250 ml: 100.000 đồng.',
            'Một đơn vị máu thể tích 350 ml: 150.000 đồng.',
            'Một đơn vị máu thể tích 450 ml: 180.000 đồng.',
            '+ Được cấp giấy chứng nhận hiến máu tình nguyện của Ban chỉ đạo hiến máu nhân đạo Tỉnh, Thành phố. Ngoài giá trị về mặt tôn vinh, giấy chứng nhận hiến máu có giá trị bồi hoàn máu, số lượng máu được bồi hoàn lại tối đa bằng lượng máu người hiến máu đã hiến. Giấy Chứng nhận này có giá trị tại các bệnh viện, các cơ sở y tế công lập trên toàn quốc.',
        ],
    },
    {
        id: 4,
        question: 'Tại sao lại có nhiều người cần phải được truyền máu?',
        answer: [
            'Mỗi giờ có hàng trăm người bệnh cần phải được truyền máu vì :',
            '- Bị mất máu do chấn thương, tai nạn, thảm hoạ, xuất huyết tiêu hoá...',
            '- Do bị các bệnh gây thiếu máu, chảy máu: ung thư máu, suy tuỷ xương, máu khó đông...',
            '- Các phương pháp điều trị hiện đại cần truyền nhiều máu: phẫu thuật tim mạch, ghép tạng...',
        ],
    },
    {
        id: 5,
        question: 'Nhu cầu máu điều trị ở nước ta hiện nay?',
        answer: [
            '- Mỗi năm nước ta cần khoảng 1.800.000 đơn vị máu điều trị.',
            '- Máu cần cho điều trị hằng ngày, cho cấp cứu, cho dự phòng các thảm họa, tai nạn cần truyền máu với số lượng lớn.',
            '- Hiện tại chúng ta đã đáp ứng được khoảng 54% nhu cầu máu cho điều trị.',
        ],
    },
];

export const hospitalColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'hospitalName',
        headerName: 'hospitalName',
        width: 200,
        // renderCell: (params) => {
        //     let url = new Buffer(params.row.image, 'base64').toString('binary');
        //     return (
        //         <div className="cellWithImg">
        //             <img className="cellImg" src={'url'} alt="avatar" />
        //             {params.row.hospitalName}
        //         </div>
        //     );
        // },
        renderCell: (params) => {
            let url = '';
            if (params.row.image) {
                url = new Buffer(params.row.image, 'base64').toString('binary');
            }
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={url} alt="avt" />
                    {params.row.hospitalName}
                </div>
            );
        },
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
    },

    {
        field: 'phoneNumber',
        headerName: 'phoneNumber',
        width: 100,
    },

    {
        field: 'address',
        headerName: 'Số nhà',
        width: 120,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 80,
        renderCell: (params) => {
            return <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>;
        },
    },
];

export const donorColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'email',
        headerName: 'email',
        width: 240,
        renderCell: (params) => {
            let url = '';
            if (params.row.image) {
                url = new Buffer(params.row.image, 'base64').toString('binary');
            }
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={url} alt="avt" />
                    {params.row.email}
                </div>
            );
        },
    },
    {
        field: 'firstName',
        headerName: 'firstName',
        width: 140,
    },

    // {
    //     field: 'lastName',
    //     headerName: 'lastName',
    //     width: 100,
    // },
    {
        field: 'groupBlood',
        headerName: 'Nhóm máu',
        width: 100,
    },
    {
        field: 'numberOfDonation',
        headerName: 'Số lần hiến máu',
        width: 120,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 80,
        renderCell: (params) => {
            return <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>;
        },
    },
];

export const recipientColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'email',
        headerName: 'email',
        width: 240,
        renderCell: (params) => {
            let url = '';
            if (params.row.image) {
                url = new Buffer(params.row.image, 'base64').toString('binary');
            }
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={url} alt="avt" />
                    {params.row.email}
                </div>
            );
        },
    },
    {
        field: 'firstName',
        headerName: 'firstName',
        width: 140,
    },
    // {
    //     field: 'lastName',
    //     headerName: 'lastName',
    //     width: 100,
    // },
    {
        field: 'gender',
        headerName: 'gender',
        width: 80,
    },
    {
        field: 'groupBlood',
        headerName: 'Nhóm máu',
        width: 100,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 80,
        renderCell: (params) => {
            return <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>;
        },
    },
];

//temporary data
export const userRows = [
    {
        id: 1,
        hospitalName: 'Snow',
        image: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        status: 'active',
        email: '1snow@gmail.com',
        phoneNumber: 35,
    },
    {
        id: 2,
        hospitalName: 'Jamie Lannister',
        image: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        email: '2snow@gmail.com',
        status: 'passive',
        phoneNumber: 42,
    },
    {
        id: 3,
        hospitalName: 'Lannister',
        image: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        email: '3snow@gmail.com',
        status: 'pending',
        phoneNumber: 45,
    },
    {
        id: 4,
        hospitalName: 'Stark',
        image: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        email: '4snow@gmail.com',
        status: 'active',
        phoneNumber: 16,
    },
    {
        id: 5,
        hospitalName: 'Targaryen',
        image: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        email: '5snow@gmail.com',
        status: 'passive',
        phoneNumber: 22,
    },
    {
        id: 6,
        hospitalName: 'Melisandre',
        image: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        email: '6snow@gmail.com',
        status: 'active',
        phoneNumber: 15,
    },
    {
        id: 7,
        hospitalName: 'Clifford',
        image: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        email: '7snow@gmail.com',
        status: 'passive',
        phoneNumber: 44,
    },
    {
        id: 8,
        hospitalName: 'Frances',
        image: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        email: '8snow@gmail.com',
        status: 'active',
        phoneNumber: 36,
    },
    {
        id: 9,
        hospitalName: 'Roxie',
        image: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        email: 'snow@gmail.com',
        status: 'pending',
        phoneNumber: 65,
    },
    {
        id: 10,
        hospitalName: 'Roxie',
        image: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        email: 'snow@gmail.com',
        status: 'active',
        phoneNumber: 65,
    },
];

export const requests = [
    {
        id: 1,
        name: 'Trần Anh Quân',
        image: '',
        address: '654 Trưng Nữ Vương, Hải Châu, Đà Nẵng',
        phone: '0123456789',
        bloodGroup: 'O+',
    },
    {
        id: 2,
        name: 'Ngô Thị Thu Thảo',
        image: '',
        address: 'Bến xe Đà Nẵng',
        phone: '0123456789',
        bloodGroup: 'AB-',
    },
    {
        id: 3,
        name: 'Lê Đỗ Hoàng Khiêm',
        image: '',
        address: '03 Trưng Nữ Vương, Hải Châu, Đà Nẵng',
        phone: '0123456789',
        bloodGroup: 'A+',
    },
    {
        id: 4,
        name: 'Hồ Quang Huy',
        image: '',
        address: '01 Lê Đại Hành, Đà Nẵng',
        phone: '0123456789',
        bloodGroup: 'B+',
    },
];
