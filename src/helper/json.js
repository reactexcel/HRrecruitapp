import { COLOR } from '../styles/color';

export const pageDeatils = [
    {
        image: require('../images/job.png'),
        name:'JOB OPENINGS',
        icon:'ios-arrow-forward-outline',
        route:'JobList'
    },
    {
        image: require('../images/company.png'),
        name: 'EXCELLENCE TECHNOLOGIES',
        icon: 'ios-arrow-forward-outline',
        route: 'AboutUs'
    },
    {
        image: require('../images/interview.png'),
        name: 'START INTERVIEW',
        icon: 'ios-arrow-forward-outline',
        route: 'InterviewLogin'
    }
]
export const AppDetails = [
    {
        image: require('../images/hello.png'),
        boldText:'   Career App',
        headerText:'Hey there',
        rawText :'Welcome to Excellence Technologies',
        bkGrndClr: COLOR.DARKBLUE
    }, 
    {
        image: require('../images/jobs.png'),
        boldText: '  Jobs',
        headerText: '',
        rawText: 'Apply',
        bkGrndClr: COLOR.DARKBLUE
    },
    {
        image: require('../images/test.png'),
        boldText: '  Online Test',
        headerText: '',
        rawText: 'Take',
        bkGrndClr: COLOR.DARKBLUE
    },
    {
        image: require('../images/status.png'),
        boldText: '   Application Status',
        headerText: '',
        rawText: 'Check',
        bkGrndClr: COLOR.DARKBLUE
    },
]