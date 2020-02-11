const slotConfig = {
    symbolsList: {
        'BAR': {
            img: 'BAR.png',
            group: ['BAR'],
            value: 'BAR',
        },
        '2xBAR': {
            img: '2xBAR.png',
            group: ['BAR'],
            value: '2xBAR',
        },
        '3xBAR': {
            img: '3xBAR.png',
            group: ['BAR'],
            value: '3xBAR',
        },
        '7': {
            img: '7.png',
            group: ['7'],
            value: '7',
        },
        'CHERRY': {
            img: 'CHERRY.png',
            group: ['CHERRY'],
            value: 'CHERRY',
        }
    },
    symbolsOrder: [
        "3xBAR",
        "BAR",
        "2xBAR",
        "7",
        "CHERRY",
    ],
    payTable: {
        single: {
            'CHERRY CHERRY CHERRY': {
                top: 2000,
                center: 1000,
                bottom: 4000
            },
            '7 7 7': {
                top: 150,
                center: 150,
                bottom: 150
            },
            'CHERRY CHERRY 7': {
                top: 75,
                center: 75,
                bottom: 75
            },
            'CHERRY 7 7': {
                top: 75,
                center: 75,
                bottom: 75
            },
            '7 7 CHERRY': {
                top: 75,
                center: 75,
                bottom: 75
            },
            '7 CHERRY CHERRY': {
                top: 75,
                center: 75,
                bottom: 75
            },
            '3xBAR 3xBAR 3xBAR': {
                top: 50,
                center: 50,
                bottom: 50
            },
            '2xBAR 2xBAR 2xBAR': {
                top: 20,
                center: 20,
                bottom: 20
            },
            'BAR BAR BAR': {
                top: 10,
                center: 10,
                bottom: 10
            },
        },
        groups: {
            'BAR BAR BAR': {
                top: 5,
                center: 5,
                bottom: 5
            },
            // Combination of any BAR symbols on any line 5
        },
    }
};

export default slotConfig;
