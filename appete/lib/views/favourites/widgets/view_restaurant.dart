import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
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

          return CustomScrollView(
            slivers: [
              SliverAppBar(
                expandedHeight: 250,
                pinned: true,
                flexibleSpace: FlexibleSpaceBar(
                  background: Stack(
                    fit: StackFit.expand,
                    children: [
                      restaurant.photo.isNotEmpty
                          ? Image.network(
                              restaurant.photo,
                              fit: BoxFit.cover,
                            )
                          : Container(color: Colors.grey),
                      Container(
                        color: Colors.black.withOpacity(0.4),
                      ),
                    ],
                  ),
                  title: Text(
                    restaurant.name,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                actions: [
                  IconButton(
                    icon: const Icon(Icons.favorite_border),
                    onPressed: () {
                      // Add favorite action
                    },
                  ),
                ],
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              restaurant.address,
                              style: const TextStyle(
                                fontSize: 16,
                                color: Colors.grey,
                              ),
                            ),
                          ),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor:
                                  const Color.fromARGB(255, 187, 110, 47),
                            ),
                            onPressed: () {
                              // Follow action
                            },
                            child: const Text("Open",
                                style: TextStyle(color: Colors.white)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                    ],
                  ),
                ),
              ),
              SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    final category = groupedMenuItems.keys.elementAt(index);
                    final items = groupedMenuItems[category]!;

                    return Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 8.0, horizontal: 16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            category,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
                          ),
                          const SizedBox(height: 8),
                          // Create a list for items in the category
                          ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: items.length,
                            itemBuilder: (context, itemIndex) {
                              final item = items[itemIndex];
                              return Card(
                                elevation: 4,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12.0),
                                ),
                                child: Padding(
                                  padding: const EdgeInsets.all(16.0),
                                  child: Row(
                                    children: [
                                      // ClipRRect(
                                      //   borderRadius: BorderRadius.circular(12.0),
                                      //   child: item.imageUrl.isNotEmpty
                                      //       ? Image.network(
                                      //           item.imageUrl,
                                      //           fit: BoxFit.cover,
                                      //           width: 80,
                                      //           height: 80,
                                      //         )
                                      //       : Container(
                                      //           color: Colors.grey,
                                      //           width: 80,
                                      //           height: 80,
                                      //         ),
                                      // ),
                                      const SizedBox(width: 16),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              item.itemName,
                                              style: const TextStyle(
                                                fontSize: 16,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            const SizedBox(height: 4),
                                            Text(
                                              "LKR ${item.price}",
                                              style: const TextStyle(
                                                fontSize: 14,
                                                color: Colors.black,
                                              ),
                                            ),
                                            const SizedBox(height: 4),
                                            Row(
                                              children: [
                                                const SizedBox(width: 4),
                                                Text(
                                                  "${item.description}",
                                                  style: const TextStyle(
                                                    fontSize: 10,
                                                    color: Colors.grey,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ),
                                      // IconButton(
                                      //   icon: const Icon(Icons.add),
                                      //   onPressed: () {
                                      //     // Action for adding to cart
                                      //   },
                                      // ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    );
                  },
                  childCount: groupedMenuItems.keys.length,
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
