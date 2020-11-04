'use strict';

const
    fakeEmail = 'myFakeEmail@mailinator.com',
    fakeProfileId = 'qwerty',
    fakeInvalidProfileId = 'asdfgh',
    fakeMetricId = 'zxcvbn',
    profileData = {
        myCustomProperty: true,
        updated: '2020-10-30 17:26:44',
        last_name: '',
        '$longitude': '',
        '$email': fakeEmail,
        object: 'person',
        '$latitude': '',
        '$address1': '',
        '$address2': '',
        '$title': '',
        '$timezone': '',
        id: fakeProfileId,
        first_name: '',
        '$organization': '',
        '$region': '',
        '$id': '',
        created: '2020-08-14 22:51:43',
        '$last_name': '',
        '$phone_number': '',
        '$country': '',
        '$zip': '',
        '$first_name': '',
        '$city': '',
        email: fakeEmail
    },
    timelineData = {
        'count': 1,
        'object': '$list',
        'data': [{
            'event_properties': {
                '$event_id': '1604078804'
            },
            'uuid': 'asdfasdfasdfasdf',
            'event_name': 'Test Event',
            'timestamp': 1604078804,
            'object': 'event',
            'datetime': '2020-10-10 01:02:03+00:00',
            'person': {
                'myCustomProperty': true,
                'updated': '2020-11-11 12:34:56',
                'last_name': '',
                '$longitude': '',
                '$email': fakeEmail,
                'object': 'person',
                '$latitude': '',
                '$address1': '',
                '$address2': '',
                '$title': '',
                '$timezone': '',
                'id': fakeProfileId,
                'first_name': '',
                '$organization': '',
                '$region': '',
                '$id': '',
                'created': '2020-08-14 22:51:43',
                '$last_name': '',
                '$phone_number': '',
                '$country': '',
                '$zip': '',
                '$first_name': '',
                '$city': '',
                'email': fakeEmail
            },
            'statistic_id': 'VRj3ac',
            'id': '3jNvgTkG'
        }],
        'next': null
    };

module.exports = {
    fakeProfileId,
    fakeMetricId,
    fakeInvalidProfileId,
    profileData,
    timelineData
}
