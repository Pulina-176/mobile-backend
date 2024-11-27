import 'package:appete/controllers/current_address_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HomePage_Restaurant extends StatelessWidget {
  HomePage_Restaurant({super.key});

  final CurrentAddressController _addressController = Get.put(CurrentAddressController());
  late String test;

  @override
  Widget build(BuildContext context) {
    test = _addressController.getAddress;
    return Scaffold(
      body: Center(
        child: Text("Welcome Sir to your Restaurant !"),
      ),
    );
  }
}