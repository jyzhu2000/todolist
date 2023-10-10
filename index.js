import express from "express"; 
import bodyParser from "body-parser";

const app = express(); 
const port = 3000; 

let items = [];
let workItems = [];
let isWork = false;


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    isWork = false;
    res.render("index.ejs", { 
        title: formatDate(new Date()),
        items: items 
    });
}); 

app.get("/work", (req, res) => {
    isWork = true;
    res.render("index.ejs", { 
        title: "Work List",
        items: workItems 
    });
})

app.post("/submit", (req, res) => {
    if (isWork) {
        workItems.push(req.body.item);
        res.render("index.ejs", { 
            title: "Work List",
            items: workItems 
        });
    } else {
        items.push(req.body.item);
        res.render("index.ejs", { 
            title: formatDate(new Date()),
            items: items 
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function formatDate(date) {
    let dayOfWeek;
    switch(date.getDay()) {
        case 0: dayOfWeek = "Sunday"; break; 
        case 1: dayOfWeek = "Monday"; break; 
        case 2: dayOfWeek = "Tuesday"; break; 
        case 3: dayOfWeek = "Wednesday"; break; 
        case 4: dayOfWeek = "Thursday"; break; 
        case 5: dayOfWeek = "Friday"; break; 
        case 6: dayOfWeek = "Saturday"; break;
    };

    let month; 
    switch(date.getMonth()) {
        case 0: month = "January"; break;
        case 1: month = "February"; break;
        case 2: month = "March"; break;
        case 3: month = "April"; break;
        case 4: month = "May"; break;
        case 5: month = "June"; break;
        case 6: month = "July"; break;
        case 7: month = "August"; break;
        case 8: month = "September"; break;
        case 9: month = "October"; break;
        case 10: month = "November"; break;
        case 11: month = "December"; break;
    };

    return `${dayOfWeek}, ${month} ${date.getDate()}`;
}