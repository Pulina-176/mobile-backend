import 'package:flutter/material.dart';

class AddItemPage extends StatelessWidget {
  final List<String> categories = ['Category 1', 'Category 2', 'Category 3'];
  final TextEditingController itemNameController = TextEditingController();
  final TextEditingController priceController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController newCategoryController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    String selectedCategory = categories[0];

    return Scaffold(
      appBar: AppBar(
        title: Text('Add Item'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            DropdownButtonFormField<String>(
              value: selectedCategory,
              onChanged: (String? newValue) {
                selectedCategory = newValue!;
              },
              items: categories.map<DropdownMenuItem<String>>((String category) {
                return DropdownMenuItem<String>(
                    value: category,
                    child: 
                      Text(category)
                );
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
                    content: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text("test")
                          // ListView(
                          //     children: const <Widget>[
                          //       ListTile(
                          //         leading: Icon(Icons.map),
                          //         title: Text('Map'),
                          //       ),
                          //       ListTile(
                          //         leading: Icon(Icons.photo_album),
                          //         title: Text('Album'),
                          //       ),
                          //       ListTile(
                          //         leading: Icon(Icons.phone),
                          //         title: Text('Phone'),
                          //       ),
                          //     ],
                          //   ),
                      ),
                    actions: [
                      ElevatedButton(
                        child: const Text("submit"),
                        onPressed: () {
                          // your code
                        },
                      ),
                    ],
                  );
                },
              );
    }
}