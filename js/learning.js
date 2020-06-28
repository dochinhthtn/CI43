// // CRUD

// // create
// async function createData(data = {}) {
//     let newData = await firebase.firestore().collection("sandals").add({
//         brand: "Bitis",
//         color: "gray",
//         size: 50,
//         price: 70
//     });
//     console.log(newData);
// }

// // read
// async function readData() {
//     // lấy ra tất cả bản ghi nằm trong sandals
//     // let result = await firebase.firestore().collection("sandals").get();
//     // for(let doc of result.docs) {
//     //     console.log(doc.data());
//     // }

//     // lấy ra những bản ghi thỏa mãn điều kiện cho trước
//     let result = await firebase.firestore().collection("sandals").where("brand", "==", "Nike").where('size', '>=', '35').get();

//     console.log(result);
//     for (let doc of result.docs) {
//         console.log(doc.data());
//     }
// }

// // delete
// async function deleteData(docId) {
//     await firebase.firestore().collection('sandals').doc(docId).delete();
// }

// // delete all data
// async function deleteAllData() {
//     // get all sandals
//     let result = await firebase.firestore().collection('sandals').get();
//     // delete each sandal with id
//     for (let doc of result.docs) {
//         await deleteData(doc.id);
//     }
// }

// // update data
// async function updateData(docId) {
//     // 
//     await firebase.firestore().collection('sandals').doc(docId).update({
//         brand: 'Nike',
//         price: 100
//     });
// }

// function foo() {
//     let a = b = 0;
//     a++;
//     return a;
// }

// foo();

// console.log(a);
// console.log(b);

// window['b'] = 10;
// console.log(b);

var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
  var color = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + color;
  bg.style.backgroundColor = color;
}