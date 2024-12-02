import 'package:get/get.dart';
import 'package:appete/models/Restaurant.dart'; // Import the restaurant model
import 'package:appete/controllers/current_address_controller.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class SearchNearController extends GetxController {
  RxList<Restaurant> _restaurantList = <Restaurant>[].obs;
  RxList<Restaurant> _filteredRestaurants = <Restaurant>[].obs;

  List<Restaurant> get getFilteredRestaurants => _filteredRestaurants;

  final CollectionReference restaurantCollection =
      FirebaseFirestore.instance.collection('restaurants');

  // Method to fetch all restaurants from Firestore
  Future<void> fetchRestaurants() async {
    try {
      QuerySnapshot snapshot = await restaurantCollection.get();

      // Print the fetched documents
      // snapshot.docs.forEach((doc) {
      //   print("Fetched restaurant data: ${doc.data()}");
      // });

      // Convert the documents to a list of Restaurant objects
      List<Restaurant> restaurants = snapshot.docs.map((doc) {
        return Restaurant.fromJson(doc.data() as Map<String, dynamic>);
      }).toList();

      // Update the restaurant list
      setRestaurantList(restaurants);
    } catch (e) {
      print("Error fetching restaurants: $e");
    }
  }

  // Method to set the restaurant list
  void setRestaurantList(List<Restaurant> restaurants) {
    _restaurantList.assignAll(restaurants);
  }

  void setCity(
      CurrentAddressController current_address_controller, String city) {
    current_address_controller.setAddress = city;
  }

  // Method to search restaurants in a specific city
  void searchByCity(CurrentAddressController current_address_controller) {
    String currentCity = current_address_controller.getAddress;

    _filteredRestaurants.value = _restaurantList
        .where((restaurant) => restaurant.address
            .toLowerCase()
            .contains(currentCity.toLowerCase()))
        .toList();
  }

  void clearSearch() {
    _filteredRestaurants.clear();
  }
}
