const productdb = (dbname,table) =>{

    // create database

const db = new Dexie(dbname)
db.version(1).stores(table);
db.open();


return db;


}
// insert function 


//check textbox validateion
const bulkcreate =(dbtable,data)=>{
    let flag = empty(data);
    if (flag){
        dbtable.bulkAdd([data]);
        console.log("data inserted successfully");
    }
    else{
        console.log("please provide data");
    }
    return flag;

    
}

const empty = (object) =>{
    let flag = false;

    for(const value in object){
        if(object[value]!=""&&object.hasOwnProperty(value)){
            flag = true;
        }
        else flag = false;
    }
    return flag;
}

// Get data from the database
const getData =(dbtable,fn) =>{
    let index = 0;
    let obj = 0;

    dbtable.count((count)=>{
       if(count){
        dbtable.each(table=>{
            console.log(table);

            obj = sortObj(table);
            fn(obj,index++);

            console.log(obj);
        })
       }
       else{
        fn(0);
       }
    })

}

//Sort obj
const sortObj = (sortobj) =>{
    let obj = {};
    obj = {
        id : sortobj.id,
        name : sortobj.name,
        seller : sortobj.seller,
        price : sortobj.price
    }
    return obj;
}


//create dynamci element
const createEle =(tagname,appendTo,fn)=>{
    const element = document.createElement(tagname);
    if(appendTo) appendTo.appendChild(element);
    if(fn) fn(element);

}




export default productdb;
export {
    bulkcreate,
    getData,
    createEle
};

