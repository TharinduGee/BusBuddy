import 'dart:convert';
import 'package:busbuddy/constants.dart';
import 'package:http/http.dart' as http;
import 'package:busbuddy/models/driver_model.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Trips {
  List<DriverModel> trips = [];
  final storage = const FlutterSecureStorage();

  Future<void> getTrips(DateTime selectedDate) async {
    try {
      String selectedDateString = selectedDate.toIso8601String();
      String? token = await storage.read(key: 'JWtoken');

      if (token != null) {
        String url =
            'http://$khost:8081/api/v1/trip/findForEmployee?date=$selectedDateString';

        var response = await http.get(Uri.parse(url), headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        });

        if (response.statusCode == 200) {
          var jsonData = json.decode(response.body);
          List<DriverModel> fetchedTrips = [];
          print(jsonData);

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
            fetchedTrips.add(trip);
          }

          trips = fetchedTrips;
        } else {
          // Handle error responses
          print('Failed to fetch trip data: ${response.reasonPhrase}');
        }
      } else {
        print('JWT token not found in local storage');
        // Handle the case where JWT token is not found in local storage
      }
    } catch (error) {
      // Handle other errors
      print('Error fetching trip data: $error');
    }
  }
}
