import 'dart:convert';
import 'package:busbuddy/constants.dart';
import 'package:http/http.dart' as http;
import 'package:busbuddy/models/driver_model.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:intl/intl.dart';

class Trips {
  List<DriverModel> trips = [];
  final storage = const FlutterSecureStorage();
  late String token;

  Future<void> getTrips(DateTime selectedDate) async {
    try {
      String selectedDateString = DateFormat('yyyy-MM-dd').format(selectedDate);
      // print(selectedDateString);
      token = await storage.read(key: 'JWtoken') ?? "";

      String url =
          'http://$khost:8081/api/v1/trip/findForEmployee?date=$selectedDateString';

      final response = await http.get(
        Uri.parse(url),
        headers: {'Authorization': 'Bearer $token'},
      );
      if (response.statusCode == 200) {
        var jsonData = json.decode(response.body);
        // print(jsonData);

        for (var item in jsonData) {
          DriverModel trip = DriverModel(
            startDestination: item['startDestination'],
            endDestination: item['endDestination'],
            starttime: item['startTime'],
            endtime: item['endTime'],
            conductorName: item['conductorName'],
            tripStatus: item['tripStatus'],
            numberPlate: item['numberPlate'],
          );
          trips.add(trip);
        }
      } else {
        // Handle error responses
        print('Failed to fetch trip data: ${response.statusCode}');
      }
    } catch (error) {
      // Handle other errors
      print('Error fetching trip data: $error');
    }
  }
}
