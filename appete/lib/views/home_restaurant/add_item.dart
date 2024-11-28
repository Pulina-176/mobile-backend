import 'package:appete/controllers/restaurant_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AddItemPage extends StatelessWidget {

  final TextEditingController itemNameController = TextEditingController();
  final TextEditingController priceController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController newCategoryController = TextEditingController();

  final RestaurantController _controller = Get.put(RestaurantController());
  List<String>? categories;

  @override
  Widget build(BuildContext context) {
    categories = _controller.getCategories();
    print(categories);
    String selectedCategory = '';

    return Scaffold(
      appBar: AppBar(
        title: Text('Add Item'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            DropdownButtonFormField<String>(
              value: null,
              onChanged: (String? newValue) {
                selectedCategory = newValue!;
              },
              items:
                  categories!.map<DropdownMenuItem<String>>((String category) {
                return DropdownMenuItem<String>(
                    value: category, child: Text(category));
              }).toList(),
              decoration: InputDecoration(
                labelText: 'Category',
              ),
            ),
            ElevatedButton(
              onPressed: () {
                manageCategory(context);
              },
              child: Text('Manage Categories'),
            ),
            TextField(
              controller: itemNameController,
              decoration: InputDecoration(
                labelText: 'Item Name',
              ),
            ),
            TextField(
              controller: priceController,
              decoration: InputDecoration(
                labelText: 'Price',
              ),
              keyboardType: TextInputType.number,
            ),
            TextField(
              controller: descriptionController,
              decoration: InputDecoration(
                labelText: 'Description',
              ),
            ),
            TextField(
              controller: newCategoryController,
              decoration: InputDecoration(
                labelText: 'New Category',
              ),
            ),
            ElevatedButton(
              onPressed: () {
                // Handle item submission logic here
              },
              child: Text('Submit'),
            ),
          ],
        ),
      ),
    );
  }

  Future<dynamic> manageCategory(BuildContext context) {
    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          scrollable: true,
          title: const Text("Available Categories"),
          content: Column(
            children: [
              ConstrainedBox(
                constraints: BoxConstraints(
                  maxHeight: 400, // Maximum height
                ),
                child: ListView(
                  shrinkWrap:
                      true, // Ensures the ListView takes up only the necessary height
                  children: categories!.map((category) {
                    return ListTile(
                      leading: Icon(Icons.category), // Same icon for all items
                      title: Text(category),
                      trailing: IconButton(
                        onPressed: () {
                          // Handle delete logic here
                          _controller.deleteCategory(category);
                        },
                        icon: Icon(Icons.delete),
                      ),
                    );
                  }).toList(), // Convert the map result into a List<Widget>
                ),
              ),
              ElevatedButton(
                child: const Text("Add new"),
                onPressed: () {
                  newCategory(context);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  Future<dynamic> newCategory(BuildContext context) {
    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Add New Category'),
          content: TextField(
            controller: newCategoryController,
            decoration: InputDecoration(
              labelText: 'Category Name',
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                if (newCategoryController.text.isNotEmpty) {
                  _controller.addCategory(newCategoryController.text);
                  newCategoryController.clear();
                  Navigator.of(context).pop();
                }
              },
              child: Text('Add'),
            ),
          ],
        );
      },
    );
  }
}
