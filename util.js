const days = [
    "M",
    "T",
    "W",
    "TH",
    "F",
    "SS",
    "S"
];


function monthMax( leapYear ){
    return [
        31,
        (leapYear)?29:28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ];
}

function generateMonth( startDay, max ){
    let result = [];
    let firstDay = startDay || 0;
    for( let i = 0; i < max; i++ ){
        result.push( Object.assign({}, {day:days[(firstDay+i)%days.length]}, {date:i+1}) );
    }
    return result;
}

function generateYear( startDay, leapYear ){
    return monthMax(leapYear).reduce((year,max)=>{
        let months = year.months || [];
        let firstDay = year.nextFirstDay || 0;
        let month = generateMonth(firstDay,max);
        months.push(month);
        return Object.assign(
            {},
            {months:months},
            {nextFirstDay: days.indexOf(month[month.length-1].day)+1}
        );
    },{nextFirstDay: startDay}).months;
}

function countSundays( startDay, leapYear ){
    return generateYear(startDay, leapYear )
        .map(month=>month.filter(d=>d.day==='S'))
        .reduce(
            (tally,sundays)=>{
                let count = (tally||{})[sundays.length]||0;
                tally[sundays.length]=++count;
                return tally;
            },
            {}
    );
}

module.exports = {
    monthMax : monthMax,
    generateMonth : generateMonth,
    generateYear : generateYear,
    countSundays : countSundays,
    days :days
};
