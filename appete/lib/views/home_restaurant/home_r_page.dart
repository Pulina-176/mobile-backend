import 'package:appete/controllers/current_address_controller.dart';
import 'package:appete/controllers/restaurant_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HomePage_Restaurant extends StatelessWidget {
  HomePage_Restaurant({super.key});

  final CurrentAddressController _addressController = Get.put(CurrentAddressController());
  late String test;

  final RestaurantController _currentRestaurant = Get.put(RestaurantController()); // controller for logged restaurant functions

  @override
  Widget build(BuildContext context) {
    String test = _currentRestaurant.currentRestaurant!.name;
    return Scaffold(
      body: Center(
        child: Text(test),
      ),
    );
  }
}