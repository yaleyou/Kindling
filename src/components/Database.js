import database from '@react-native-firebase/database';



export const readData = (userId) =>

  database()
    .ref(`/users/${userId}`)
    .once('value', function (snapshot) {

      snapshot.child("name").val();

      // this will "return" your value to the original caller
    });




export const setData = (userId, name, age, desc, gender, imgUrl) => {

  database()
    .ref(`/users/${userId}`)
    .set({
      name: name,
      age: age,
      desc: desc,
      gender: gender,
      imgUrl: imgUrl
    })
    .then(() => console.log('Data set.'))
    .catch((error) => {
      console.log(error)
    });

}

export const updateLikes = (userId, likes) => {

  database()
    .ref(`/users/${userId}/`)
    .push({
      likes: likes,
    })
    .then(() => console.log('Likes updated.'))
    .catch((error) => {
      console.log(error)
    });

}


