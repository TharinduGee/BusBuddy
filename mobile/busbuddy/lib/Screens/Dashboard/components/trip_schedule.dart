import 'dart:async';
import 'package:busbuddy/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class TripSchedule extends StatefulWidget {
  const TripSchedule({Key? key}) : super(key: key);

  @override
  _TripScheduleState createState() => _TripScheduleState();
}

class _TripScheduleState extends State<TripSchedule> {
  final storage = const FlutterSecureStorage();
  late String token;
  late String username = ''; // Initialize username with an empty string
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _getTokenAndFetchUsername();
  }

  Future<void> _getTokenAndFetchUsername() async {
    try {
      token = await storage.read(key: 'JWtoken') ?? "";
      final response = await http.get(
        Uri.parse('http://$khost:8081/api/v1/user/getUsername'),
        headers: {'Authorization': 'Bearer $token'},
      );
      if (response.statusCode == 200) {
        setState(() {
          username = response.body;
          isLoading = false;
        });
      } else {
        throw Exception('Failed to load username');
      }
    } on http.ClientException catch (e) {
      print('Error fetching username: $e');
      setState(() {
        isLoading = false;
      });
      // Handle the exception accordingly, e.g., show a snackbar with an error message
    } catch (error) {
      print('Other error fetching username: $error');
      setState(() {
        isLoading = false;
      });
      // Handle other exceptions accordingly
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('TripSchedule'),
      ),
      body: Center(
        child: isLoading
            ? CircularProgressIndicator() // Show a loading indicator while fetching data
            : Text(
                'Welcome, $username',
                style: TextStyle(fontSize: 24),
              ),
      ),
    );
  }
}
