import 'dart:async';
import 'package:busbuddy/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
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
        title: Text('Dashboard'),
      ),
      // body: Center(
      //   child: isLoading
      //       ? CircularProgressIndicator() // Show a loading indicator while fetching data
      //       : Text(
      //           'Welcome, $username',
      //           style: TextStyle(fontSize: 24),
      //         ),
      // ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.fromLTRB(8, 0, 8, 8),
            child: Material(
              color: Colors.amber,
              shadowColor: Colors.black,
              elevation: 4.0,
              borderRadius: BorderRadius.circular(16),
              child: Container(
                padding: const EdgeInsets.all(8),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                child: const Icon(
                                  Icons.location_on_sharp,
                                  color: Colors.red,
                                ),
                              ),
                              Container(
                                color: Colors.black12,
                                child: const Text(
                                  "Start Destination ",
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          Container(
                            color: Colors.black12,
                            child: Text(
                              ": BADULLA at 34:22",
                              style: const TextStyle(
                                fontSize: 15,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 15,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                child: const Icon(
                                  Icons.location_off_sharp,
                                  color: Colors.red,
                                ),
                              ),
                              Container(
                                color: Colors.black12,
                                child: const Text(
                                  "End Destination ",
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          Container(
                            color: Colors.black12,
                            child: Text(
                              ":  NUWARAELIYA at 34:22",
                              style: const TextStyle(
                                fontSize: 15,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            color: Colors.black12,
                            child: const Text(
                              "Conductor Name: ",
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),
                          ),
                          Container(
                            color: Colors.black12,
                            child: Text(
                              "conductorname",
                              style: const TextStyle(
                                fontSize: 15,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 5,
          )
        ],
      ),
    );
  }
}
