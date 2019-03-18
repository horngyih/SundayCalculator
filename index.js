let util = require("./util");

for( let i = 0; i < util.days.length; i++ ){
    let year = util.generateYear( i );
    console.log( year[0][0] );
    console.log(i, util.countSundays(i) );
}
