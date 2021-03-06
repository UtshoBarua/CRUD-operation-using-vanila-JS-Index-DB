import productdb, { bulkcreate, createEle, getData } from "./module.js";
 

let db = productdb("Productdb",{
    products : `++id,name,seller,price`
});


//input tags
const userid = document.getElementById("userid");
const proname = document.getElementById("proname");
const seller = document.getElementById("seller");
const price = document.getElementById("price");


//buttons

const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");
const notfound = document.getElementById("notfound");


// insert value using create button
btncreate.onclick =(event)=>{
    let flag = bulkcreate(db.products,{
        name: proname.value,
        seller : seller.value,
        price : price.value

    })

    console.log(flag);
    proname.value=seller.value=price.value="";
    getData(db.products,(data)=>{
        userid.value = data.id+1 || 1;
    });

    table();
    let insertmsg = document.querySelector(".insertmsg")

}

// create even on btn read buttons

btnread.onclick = table;

function table(){
    const tbody = document.getElementById("tbody");
    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }     



    getData(db.products,(data)=>{
        if(data){
            createEle("tr",tbody,tr=>{
                
                for(const value in data){
                    createEle("td",tr,td=>{
                        td.textContent = data.price ===data[value]? `$${data[value]}` : data[value]; 
                    })
                }
                createEle("td",tr,td=>{
                    createEle("i",td, i=>{
                        i.className +=  "fa fa-pencil-square-o btnedit";
                        i.setAttribute("data-id",data.id);
                        i.onclick = editbtn;
                    })

                })
                createEle("td",tr,td=>{
                    createEle("i",td, i=>{
                        i.className +=  "fa fa-trash btndelete";
                        i.setAttribute("data-id",data.id);
                        i.onclick = deletebtn;

                    })
                })
                  
            })
        }
        else{
           notfound.textContent = "No record found in the database";
        }
     
    })
}

const editbtn=(event)=>{
   let id = parseInt(event.target.dataset.id);

   db.products.get(id,data=>{
    userid.value = data.id || 0;
    proname.value = data.name || "";
    seller.value = data.seller || "";
    price.value = data.price || 0; 
   })

}

//update event 
btnupdate.onclick =()=>{
    const id= parseInt(userid.value) || 0;
    if(id){
        db.products.update(id,{
            name : proname.value,
            seller : seller.value,
            price : price.value
        })
        .then((updated)=>{
            let get = updated? `data Update`: `coudn't update data`;
            console.log(get); 
            table();
         })
    }
}
function deletebtn(event){
    let id = parseInt(event.target.dataset.id);
    db.products.delete(id);
    table();


}

btndelete.onclick=()=>{
        db.delete();
        db =productdb("Productdb",{
            products : `++id,name,seller,price`
        });
        db.open();
        table()
}