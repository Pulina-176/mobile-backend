import 'package:appete/controllers/menu_controller.dart';
import 'package:appete/controllers/restaurant_controller.dart';
import 'package:appete/models/Restaurant.dart';
import 'package:appete/views/home_restaurant/widgets/dealImagePicker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AddDeal extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();  // Input field controllers
  final _offerController = TextEditingController();
  final _descriptionController = TextEditingController();

  final RestaurantController _controller = Get.put(RestaurantController());
  final Menu_Controller _deal_controller = Get.put(Menu_Controller());

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: SingleChildScrollView( // Wrap the body with SingleChildScrollView for scrolling
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: <Widget>[
              UploadDealImage(),
              TextFormField(
                controller: _titleController,
                decoration: InputDecoration(labelText: 'Promotion Title'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a promotion title';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _offerController,
                decoration: InputDecoration(labelText: 'Offer to Highlight'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter an offer to highlight';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _descriptionController,
                decoration: InputDecoration(labelText: 'Description'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a description';
                  }
                  return null;
                },
              ),

              // Submit Button
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    // Process data
                    String title = _titleController.text;
                    String offer = _offerController.text;
                    String description = _descriptionController.text;

                    // Create Deal instance
                    Deal deal = Deal(
                      name: title,
                      dealDescription: description,
                      priceDiscount: offer,
                      photo: _deal_controller.temp_dealImage.value ?? 'https://res.cloudinary.com/dskifca6z/image/upload/v1732943760/cld-sample-4.jpg',
                    );

                    // Add deal to the database
                    _deal_controller.addDeal(_controller.currentRestaurant!.id, deal);

                  }
                },
                child: Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
