import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:appete/controllers/menu_controller.dart';
import 'package:appete/models/Restaurant.dart';

class ViewRestaurant extends StatelessWidget {
  final String restaurantId; // Restaurant ID passed from the previous page

  const ViewRestaurant({required this.restaurantId});

  Future<Map<String, dynamic>> fetchRestaurantDetails() async {
    try {
      DocumentSnapshot snapshot = await FirebaseFirestore.instance
          .collection('restaurants')
          .doc(restaurantId)
          .get();

      if (snapshot.exists) {
        return snapshot.data() as Map<String, dynamic>;
      } else {
        throw Exception("Restaurant not found");
      }
    } catch (e) {
      throw Exception("Error fetching restaurant details: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Restaurant Details"),
        backgroundColor: Colors.green,
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: fetchRestaurantDetails(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(
              child: Text("Error: ${snapshot.error}"),
            );
          }

          if (!snapshot.hasData) {
            return const Center(
              child: Text("No data available"),
            );
          }

          final restaurant = Restaurant.fromJson(snapshot.data!);

          // Group MenuItems by Category
          final groupedMenuItems = <String, List<MenuItem>>{};
          for (var item in restaurant.menuItems) {
            groupedMenuItems.putIfAbsent(item.category, () => []).add(item);
          }

          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  restaurant.name,
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  restaurant.address,
                  style: const TextStyle(fontSize: 16, color: Colors.grey),
                ),
                const SizedBox(height: 16),
                const Text(
                  "Menu",
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 16),
                Expanded(
                  child: ListView.builder(
                    itemCount: groupedMenuItems.keys.length,
                    itemBuilder: (context, index) {
                      final category = groupedMenuItems.keys.elementAt(index);
                      final items = groupedMenuItems[category]!;

                      return Card(
                        margin: const EdgeInsets.symmetric(vertical: 8.0),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                category,
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.green,
                                ),
                              ),
                              const SizedBox(height: 8),
                              DataTable(
                                columnSpacing: 16.0,
                                columns: const [
                                  DataColumn(label: Text("Name")),
                                  DataColumn(label: Text("Description")),
                                  DataColumn(label: Text("Price")),
                                ],
                                rows: items
                                    .map(
                                      (item) => DataRow(cells: [
                                        DataCell(Text(item.itemName)),
                                        DataCell(Text(item.description)),
                                        DataCell(Text("\$${item.price}")),
                                      ]),
                                    )
                                    .toList(),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
