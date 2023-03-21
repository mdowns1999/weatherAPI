'use strict';

/*****************************************
 * FOOTER DATE
 * Display current year on page
 * ***************************************/
 function footer_date() {
    let date = new Date()
    let year = date.getFullYear()

    document.getElementById('year').textContent = year;
}



footer_date()






























//     let value = localStorage.getItem("Select Value");
//     value = parseInt(value)

//    //console.log(`This value is a: ${typeof(value)}`)
//    console.log(value)