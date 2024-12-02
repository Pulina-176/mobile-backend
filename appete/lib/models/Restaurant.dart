import 'dart:convert';

List<Restaurant> restaurantFromJson(String str) =>
    List<Restaurant>.from(json.decode(str).map((x) => Restaurant.fromJson(x)));

String userToJson(List<Restaurant> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Restaurant {
  String id;
  String name;
  String address;
  var categoryList = <String>[];

  var deals = <Deal>[];
  var menuItems = <MenuItem>[];

  Restaurant({
    required this.id,
    required this.name,
    required this.address,
    List<String>? categoryList, // Use nullable type
    List<MenuItem>? menuItems, // Use nullable type
    List<Deal>? deals, // Use nullable type
  }) : categoryList = categoryList ?? [], // Initialize with default
       menuItems = menuItems ?? []; // Initialize with default

  factory Restaurant.fromJson(Map<String, dynamic> json) => Restaurant(
    id: json["id"],
    name: json["name"],
    address: json["address"],
    categoryList: List<String>.from(json["categoryList"]),
    menuItems: List<MenuItem>.from(json["menuItems"].map((x) => MenuItem.fromJson(x))),
    deals: List<Deal>.from(json["deals"].map((x) => Deal.fromJson(x))),
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "name": name,
    "address": address,
    "categoryList": categoryList,
    "menuItem": menuItems,
    "deals": deals,
  };


}

// Object for deals
class Deal {
  String name;
  String dealDescription;
  // String photo;
  String priceDiscount;

  Deal({
    required this.name,
    required this.dealDescription,
    // required this.photo,
    required this.priceDiscount,
  });

  factory Deal.fromJson(Map<String, dynamic> json) => Deal(
    name: json["name"],
    dealDescription: json["dealDescription"],
    // photo: json["photo"],
    priceDiscount: json["priceDiscount"],
  );

  Map<String, dynamic> toJson() => {
    "name": name,
    "dealDescription": dealDescription,
    // "photo": photo,
    "priceDiscount": priceDiscount,
  };
}

// Object for MenuItems
class MenuItem {
  String category;
  String itemName;
  String description;
  // String photo;
  String price;

  MenuItem({
    required this.category,
    required this.itemName,
    required this.description,
    // required this.photo,
    required this.price,
  });

  factory MenuItem.fromJson(Map<String, dynamic> json) => MenuItem(
        category: json["category"],
        itemName: json["itemName"],
        description: json["description"],
        // photo: json["photo"],
        price: json["price"],
      );

  Map<String, dynamic> toJson() => {
        "category": category,
        "itemName": itemName,
        "description": description,
        // "photo": photo,
        "price": price,
      };
}
