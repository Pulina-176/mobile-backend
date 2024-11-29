import 'dart:convert';

List<Restaurant> restaurantFromJson(String str) =>
    List<Restaurant>.from(json.decode(str).map((x) => Restaurant.fromJson(x)));

String userToJson(List<Restaurant> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Restaurant {
  String name;
  String address;
  var categoryList = <String>[];

  var deals = <Deal>[];
  var menuItems = <MenuItem>[];

  Restaurant({required this.name, required this.address});

  void setMenuItem(MenuItem menu_item) {
    menuItems.add(menu_item);
  }

  void setDeal(Deal deal) {
    deals.add(deal);
  }

  factory Restaurant.fromJson(Map<String, dynamic> json) =>
      Restaurant(name: json["name"], address: json["address"]);

  Map<String, dynamic> toJson() => {"name": name, "address": address};
}

// Object for deals
class Deal {
  String name;
  String dealDescription;
  String photo;
  String priceDiscount;

  Deal({
    required this.name,
    required this.dealDescription,
    required this.photo,
    required this.priceDiscount,
  });

  factory Deal.fromJson(Map<String, dynamic> json) => Deal(
        name: json["name"],
        dealDescription: json["dealDescription"],
        photo: json["photo"],
        priceDiscount: json["price_discount"],
      );

  Map<String, dynamic> toJson() => {
        "name": name,
        "dealDescription": dealDescription,
        "photo": photo,
        "price_discount": priceDiscount,
      };
}

// Object for MenuItems
class MenuItem {
  String category;
  String itemName;
  String description;
  String photo;
  String price;

  MenuItem({
    required this.category,
    required this.itemName,
    required this.description,
    required this.photo,
    required this.price,
  });

  factory MenuItem.fromJson(Map<String, dynamic> json) => MenuItem(
        category: json["category"],
        itemName: json["itemName"],
        description: json["description"],
        photo: json["photo"],
        price: json["price"],
      );

  Map<String, dynamic> toJson() => {
        "category": category,
        "itemName": itemName,
        "description": description,
        "photo": photo,
        "price": price,
      };
}
