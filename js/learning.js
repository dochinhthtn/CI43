// CRUD

// create
async function createData(data = {}) {
    let newData = await firebase.firestore().collection("sandals").add({
        brand: "Bitis",
        color: "gray",
        size: 50,
        price: 70
    });
    console.log(newData);
}

// read
async function readData() {
    // lấy ra tất cả bản ghi nằm trong sandals
    // let result = await firebase.firestore().collection("sandals").get();
    // for(let doc of result.docs) {
    //     console.log(doc.data());
    // }

    // lấy ra những bản ghi thỏa mãn điều kiện cho trước
    let result = await firebase.firestore().collection("sandals").where("brand", "==", "Nike").where('size', '>=', '35').get();

    console.log(result);
    for (let doc of result.docs) {
        console.log(doc.data());
    }
}

// delete
async function deleteData(docId) {
    await firebase.firestore().collection('sandals').doc(docId).delete();
}

// delete all data
async function deleteAllData() {
    // get all sandals
    let result = await firebase.firestore().collection('sandals').get();
    // delete each sandal with id
    for (let doc of result.docs) {
        await deleteData(doc.id);
    }
}

// update data
async function updateData(docId) {
    // 
    await firebase.firestore().collection('sandals').doc(docId).update({
        brand: 'Nike',
        price: 100
    });
}