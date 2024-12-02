import 'package:appete/models/Restaurant.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';

class RestaurantController extends GetxController {

  static RestaurantController get to => Get.find(); // Singleton instance for global access

  final Rxn<Restaurant> _currentRestaurant = Rxn<Restaurant>(); // Reactive variable for global state

  Restaurant? get currentRestaurant => _currentRestaurant.value; // Getter for accessing the current restaurant

  // Use RxList for categoryList
  RxList<String> categories = <String>[].obs;

  // Reference to Firestore collection
  final CollectionReference restaurantCollection =
      FirebaseFirestore.instance.collection('restaurants');

  // Fetch restaurant data and update the state
  Future<void> getRestaurant(String uid) async { // actually sets the currentRestaurant
    try {
      DocumentSnapshot<Object?> querySnapshot = await restaurantCollection.doc(uid).get();
      _currentRestaurant.value = // extract from doc and form Restaurant object
          Restaurant.fromJson(querySnapshot.data() as Map<String, dynamic>);
      Get.snackbar("message", _currentRestaurant.value!.menuItems[0].price.toString());
          
      // Update categories
      categories.value = List<String>.from(_currentRestaurant.value!.categoryList);
    } catch (e) {
      Get.snackbar('Error', 'Failed to fetch restaurant data: $e');
    }
  }

  Future<void> addCategory(String category) async {
    try{
      _currentRestaurant.value?.categoryList.add(category);
      categories.add(category); // Reactive update
      await restaurantCollection.doc(_currentRestaurant.value?.id).update({"categoryList": _currentRestaurant.value?.categoryList});

    }
    catch(e){
      Get.snackbar("Error", e.toString());
    }
  } 

  Future<void> deleteCategory(String category) async {
    try{
      categories.remove(category); // Reactive update
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

  //=========================== P R O F I L E ===========================
  void setProfile (String name, String address, String hotline, String about) async {
      try {
        _currentRestaurant.value!.name = name;
        await restaurantCollection.doc(_currentRestaurant.value?.id).update({"name": name});
        
        _currentRestaurant.value!.about = about;
        await restaurantCollection.doc(_currentRestaurant.value?.id).update({"about": about});
        
        _currentRestaurant.value!.address = address;
        await restaurantCollection.doc(_currentRestaurant.value?.id).update({"address": address});
        
        _currentRestaurant.value!.hotline = hotline;
        await restaurantCollection.doc(_currentRestaurant.value?.id).update({"hotline": hotline});

        Get.snackbar("Success", "Profile updated");
      } on Exception catch (e) {
        // TODO
        Get.snackbar("Error", e.toString());
      }
  }

}
