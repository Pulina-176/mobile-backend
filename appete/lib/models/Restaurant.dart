import 'dart:convert';

List<Restaurant> restaurantFromJson(String str) => List<Restaurant>.from(json.decode(str).map((x) => Restaurant.fromJson(x)));

String userToJson(List<Restaurant> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Restaurant {

  String uid;
  String name;
  String address;
  
  Restaurant({
    required this.uid,
    required this.name,
    required this.address
  });

  factory Restaurant.fromJson(Map<String, dynamic> json) => Restaurant(
    uid: json["uid"],
    name: json["name"],
    address: json["address"]
  );

  Map<String, dynamic> toJson() => {
    "uid": uid,
    "name": name,
    "address": address
  };


}