const assert = require("assert");
const { generateYear, generateMonth, days } = require("./util");

function testMonthDays(max){
    it(`Should generate ${max} days`, ()=>{
    let month = generateMonth(0,max);
    assert.equal(month.length, max);
    });
}

describe("Test Month Generators", ()=>{
    testMonthDays(28);
    testMonthDays(29);
    testMonthDays(30);
    testMonthDays(31);
    it( "Should generate the correct first day", ()=>{
        for( let i = 0; i < days.length; i++ ){
            let month = generateMonth(i,30);
            assert(month[0].day,days[i]);
        }
    });
});

describe("Test Year Generators", ()=>{
    it("Should generate a year with 365 days", ()=>{
        let year = generateYear(0);
        let days = year.reduce((days,month)=>{
            return days.concat(month);
        },[]);
        assert.equal(days.length, 365);
    });
    it("Should generate a year with 366 days", ()=>{
        let year = generateYear(0,true);
        let days = year.reduce((days,month)=>{
            return days.concat(month);
        },[]);
        assert.equal(days.length, 366);
    });
    it("Should generate a year with the specified first day", ()=>{
        for(let i = 0; i < days.length; i++ ){
            let year = generateYear(i);
            assert(year[0][0].day, days[i]);
        }
    });
});

describe("Generate Sundays", ()=>{
    for( let i = 0; i < days.length; i++ ){
        console.log( `Year starting with ${days[i]}` );
        let year = generateYear(i);
        let leapYear = generateYear(i,true);

        let yearSundays = year.map(month=>month.filter(d=>d.day==='S'));
        let leapYearSundays = leapYear.map(month=>month.filter(d=>d.day==='S'));

        let fiveSundays = yearSundays.filter(sundays=>sundays.length===5);
        let leapFiveSundays = leapYearSundays.filter(sundays=>sundays.length===5);
        console.log( `${fiveSundays.length} months with 5 sundays` );
        console.log( `${leapFiveSundays.length} months with 5 sundays on leap years` );
    }
});
