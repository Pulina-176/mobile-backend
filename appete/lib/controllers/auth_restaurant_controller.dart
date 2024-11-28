import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';


class AuthRestaurantController extends GetxController{
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Reference to FireStore collection
  final CollectionReference restaurantCollection = FirebaseFirestore.instance.collection('restaurants');

  Future updateRestaurantData(String? uid, String name, String address) async{
    return await restaurantCollection.doc(uid).set({
      'name': name,
      'address': address
    }).catchError((e) => {
      print(e)
    }); 
  }

  // sign in with email and password
  Future signInWithEmailAndPassword(String email, String password) async {
    try{
      UserCredential result = await _auth.signInWithEmailAndPassword(  // register with email and password
        email: email, 
        password: password
        );
      User? user = result.user;
      Get.snackbar("Success", "Welcome ${user?.uid}");
      return user;
    }
    catch (e) {
       Get.snackbar("Error", e.toString());
       print(e.toString());
    }
  }

  // register with email and password
  Future registerWithEmailAndPassword(String email, String password, String name, String address) async {
    try{
      UserCredential result = await _auth.createUserWithEmailAndPassword(  // register with email and password
        email: email, 
        password: password
        );
      User? user = result.user;
      Get.snackbar("success", "Welcome! You are now part of Appete family");
      String? userID = user?.uid;
      updateRestaurantData(userID, name, address);  // initial entry in Restaurant collection
      return user;
     }
     catch (e) {
      String error = e.toString();
      print(error);
      if (error == "[firebase_auth/email-already-in-use] The email address is already in use by another account.") { // email already in use, error handler
        Get.snackbar("error", "Email address already in use");
      }
      return null;
     }
  }


}