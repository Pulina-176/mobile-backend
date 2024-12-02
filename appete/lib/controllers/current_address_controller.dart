import 'package:get/get.dart';

class CurrentAddressController extends GetxController {
  RxString _currentAddress = ''.obs;

  String get getAddress => _currentAddress.value;

  set setAddress(String username) => _currentAddress.value = username;

  void clearCurrentUsername() {
    _currentAddress.value = '';
  }
}
