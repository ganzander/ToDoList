const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose")
const date=require(__dirname+"/date.js");

var foundItems=[];

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
mongoose.connect('mongodb+srv://Ganesh:srMMT2FN6idTY6qF@demo.yu5sygo.mongodb.net/?retryWrites=true&w=majority');

const itemSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, "You have not entered any item name"]
    }
});

const Item = mongoose.model("Item",itemSchema);

async function InsertItem(newItem){
    let item = new Item({
        name: newItem
    })
    const inserting = await item.save();
}

async function FindItem(){
    var finding = await Item.find().exec();
    foundItems=finding;
};


app.get("/", async(req,res)=>{

    // let day=date.getDate();
    await FindItem();
    // console.log("One added");
    // Update();
    console.log(foundItems.length);
    let lengthItems=foundItems.length;
    res.render('list', { kindOfDay: "Today", newItemsLength: lengthItems, newItems: foundItems});
});


app.post("/",function(req,res){
    let newItem=req.body.newItem;
    InsertItem(newItem);
    // FindItem();
    res.redirect("/");
    // setInterval(res.redirect("/"),1000);
});

app.get("/about", function(req,res){
    res.render("about");
});


app.listen(3000, function(){
    console.log("Server stared on port 3000");
})


