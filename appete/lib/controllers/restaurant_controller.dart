import 'package:appete/models/Restaurant.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';

class RestaurantController extends GetxController {

  static RestaurantController get to => Get.find(); // Singleton instance for global access

  final Rxn<Restaurant> _currentRestaurant = Rxn<Restaurant>(); // Reactive variable for global state

  Restaurant? get currentRestaurant => _currentRestaurant.value; // Getter for accessing the current restaurant

  // Reference to Firestore collection
  final CollectionReference restaurantCollection =
      FirebaseFirestore.instance.collection('restaurants');

  // Fetch restaurant data and update the state
  Future<void> getRestaurant(String uid) async {
    try {
      DocumentSnapshot<Object?> querySnapshot = await restaurantCollection.doc(uid).get();
      _currentRestaurant.value = // extract from doc and form Restaurant object
          Restaurant.fromJson(querySnapshot.data() as Map<String, dynamic>);
          print(querySnapshot.data());
          print("query ${_currentRestaurant.value?.categoryList}");
    } catch (e) {
      Get.snackbar('Error', 'Failed to fetch restaurant data: $e');
    }
  }

  Future<void> addCategory(String category) async {
    try{
      _currentRestaurant.value?.categoryList.add(category);
      await restaurantCollection.doc(_currentRestaurant.value?.id).update({"categoryList": _currentRestaurant.value?.categoryList});

    }
    catch(e){
      Get.snackbar("Error", e.toString());
    }
  } 

  Future<void> deleteCategory(String category) async {
    try{
      _currentRestaurant.value?.categoryList.remove(category);
      await restaurantCollection.doc(_currentRestaurant.value?.id).update({"categoryList": _currentRestaurant.value?.categoryList});
    }
    catch(e){
      Get.snackbar("Error", e.toString());
    }
  }

  List<String> getCategories() {
    try{
      return _currentRestaurant.value!.categoryList;
    }
    catch(e) {
      Get.snackbar("error", e.toString());
      return [];
    }

  }
}
