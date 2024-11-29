import 'package:appete/models/Restaurant.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';

class Menu_Controller extends GetxController {
  static Menu_Controller get to => Get.find(); // Singleton instance for global access

  final RxList<MenuItem> menuItems = <MenuItem>[].obs; // Reactive menu items list
  final CollectionReference restaurantCollection =
      FirebaseFirestore.instance.collection('restaurants'); // Firestore collection reference

  /// Fetch menu items for a specific restaurant
  Future<void> fetchMenuItems(String restaurantId) async {
    try {
      DocumentSnapshot<Object?> doc = await restaurantCollection.doc(restaurantId).get();
      if (doc.exists) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>;
        List<dynamic> menuData = data['menuItems'] ?? [];
        menuItems.value =
            menuData.map((item) => MenuItem.fromJson(item as Map<String, dynamic>)).toList();
      }
    } catch (e) {
      Get.snackbar('Error', 'Failed to fetch menu items: $e');
    }
  }

  /// Add a new menu item to the restaurant
  Future<void> addMenuItem(String restaurantId, MenuItem menuItem) async {
    try {
      menuItems.add(menuItem); // Add locally to update the UI
      await restaurantCollection.doc(restaurantId).update({
        'menuItems': menuItems.map((item) => item.toJson()).toList(),
      });
      Get.snackbar('Success', 'Menu item added successfully!');
    } catch (e) {
      Get.snackbar('Error', 'Failed to add menu item: $e');
    }
  }

  /// Delete a menu item from the restaurant
  Future<void> deleteMenuItem(String restaurantId, MenuItem menuItem) async {
    try {
      menuItems.remove(menuItem); // Remove locally to update the UI
      await restaurantCollection.doc(restaurantId).update({
        'menuItems': menuItems.map((item) => item.toJson()).toList(),
      });
      Get.snackbar('Success', 'Menu item deleted successfully!');
    } catch (e) {
      Get.snackbar('Error', 'Failed to delete menu item: $e');
    }
  }
}
