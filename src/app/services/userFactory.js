'use strict';

angular.module('baseangular')

.factory('userFactory', function() {

    var personalInfo = {};

    personalInfo.interests = [ 'Advertising', 'Celebrity', 'DIY/Craft', 'Entertainment', 'Family',  'Fashion', 'Food', 'Gaming', 'Health', 'Lifestyle', 'Music', 'News', 'Pop Culture', 'Social Media', 'Sports', 'Technology', 'Travel'];

    personalInfo.lifeStage = ['Single Adult', 'Married Adult', 'Kids in Elementary', 'Kids in High School', 'Kids in College'];

    personalInfo.income = ['Under $20K', '$20K - $40K', '$40K - $50K', '$50K - $75K', '$75K - $100K', '$100K +'];

    personalInfo.education = ['High School', 'Some College', 'College Degree', 'Graduate Degree'];

    personalInfo.ethnicity = ['White', 'Black/African American', 'Hispanic/Latino', 'Native American/Alaskan Native', 'Asian', 'Hawaiian Native', 'Other'];

    personalInfo.tongues = ['Arabic', 'Chinese', 'English', 'French', 'German', 'Hindi', 'Japanese', 'Portugese', 'Russian', 'Spanish'];

    return personalInfo;
    // user = {
    //     name: '',
    //     location: '',
    //     bio: '',
    //     interests: [],
    //     demographics:{
    //         lifeStage: [],
    //         income: '',
    //         education: '',
    //         ethnicity: [],
    //         language: []
    //     }
    // };
    //
    // return user;

});
