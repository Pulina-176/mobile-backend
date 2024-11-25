import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';

class AuthRestaurantController extends GetxController{
  final FirebaseAuth _auth = FirebaseAuth.instance;
  late Rx<User?> _restaurant;


}