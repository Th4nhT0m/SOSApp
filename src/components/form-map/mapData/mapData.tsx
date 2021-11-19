export const markers = [
    {
        latitude: 11.27581,
        longitude: 106.127399,
        title: 'Bệnh viện đa khoa TX Hòa Thành',
        description: 'Phạm Hùng, TT. Hoà Thành, Hoà Thành, Tây Ninh, Việt Nam',
    },
    {
        latitude: 11.277607,
        longitude: 106.130391,
        title: 'bệnh viện Cao Văn Chí',
        description: 'TT. Hoà Thành, Hoà Thành, Tây Ninh, Việt Nam',
    },
    {
        latitude: 11.290151,
        longitude: 106.11951,
        title: 'Bệnh Viện Đa Khoa Hồng Hưng',
        description: '187 Phạm Văn Đồng, Hiệp Long, Hoà Thành, Tây Ninh, Việt Nam',
    },
    {
        latitude: 11.272272,
        longitude: 106.12733,
        title: 'Bệnh Viện Xã Long Thành Trung',
        description: '296 Phạm Hùng, Long Thành Trung, Hoà Thành, Tây Ninh, Việt Nam',
    },
    {
        latitude: 11.255983,
        longitude: 106.144299,
        title: 'Trạm y tế xã Trường Tây',
        description: '744V+5JF, Long Hải, Hoà Thành, Tây Ninh, Việt Nam',
    },
    {
        latitude: 11.2707229,
        longitude: 106.1538389,
        title: 'Trạm Y tế Trường Hòa',
        description: '544 Nguyễn Văn Linh, Trường Hoà, Hoà Thành, Tây Ninh, Việt Nam',
    },
    {
        latitude: 10.3850625,
        longitude: 106.9095625,
        title: 'Trạm Y Tế Xã Long Hòa Huyện Cần Giờ',
        description:
            'Đường Nguyễn Văn Mạnh, Xã Long Hòa, Huyện Cần Giờ, Long Hoà, Cần Giờ, Thành phố Hồ Chí Minh, Việt Nam',
    },
    {
        latitude: 10.3852663,
        longitude: 106.8900078,
        title: 'Trạm y tế xã Đồng Hòa',
        description: 'Duyên Hải, Long Hoà, Cần Giờ, Thành phố Hồ Chí Minh, Việt Nam',
    },
    {
        latitude: 10.4021265,
        longitude: 106.949204,
        title: 'Bệnh viện Mới Huyện Cần Giờ',
        description: 'Phan Trọng Tuệ, TT. Cần Thạnh, Cần Giờ, Thành phố Hồ Chí Minh, Việt Nam',
    },
    {
        latitude: 10.3952064,
        longitude: 106.8837918,
        title: 'Bệnh Viện Cần Giờ',
        description:
            'Đường Nguyễn Văn Mạnh, Xã Long Hòa, Huyện Cần Giờ, Long Hoà, Cần Giờ, Thành phố Hồ Chí Minh, Việt Nam',
    },
];

export const mapDarkStyle = [
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#212121',
            },
        ],
    },
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#757575',
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#212121',
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
            {
                color: '#757575',
            },
        ],
    },
    {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9e9e9e',
            },
        ],
    },
    {
        featureType: 'administrative.land_parcel',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#bdbdbd',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#757575',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#181818',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#616161',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#1b1b1b',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#2c2c2c',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#8a8a8a',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#373737',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
                color: '#3c3c3c',
            },
        ],
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [
            {
                color: '#4e4e4e',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#616161',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#757575',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#3d3d3d',
            },
        ],
    },
];

export const c = [
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
];
