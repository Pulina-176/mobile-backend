import 'package:get/get.dart';

class UserController extends GetxController {
  
  RxString _currentUsername = ''.obs;

  String get getcurrentUsername => _currentUsername.value;

  set setcurrentUsername(String username) => _currentUsername.value = username;

  void clearCurrentUsername() {
    _currentUsername.value = '';
  }
  
}