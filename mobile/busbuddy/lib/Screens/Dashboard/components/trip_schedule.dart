import 'dart:async';
import 'package:busbuddy/constants.dart';
import 'package:calendar_agenda/calendar_agenda.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class TripSchedule extends StatefulWidget {
  const TripSchedule({Key? key}) : super(key: key);

  @override
  _TripScheduleState createState() => _TripScheduleState();
}

class _TripScheduleState extends State<TripSchedule> {
  CalendarAgendaController _calendarAgendaControllerAppBar =
      CalendarAgendaController();
  final storage = const FlutterSecureStorage();
  late String token;
  late String username = ''; // Initialize username with an empty string
  bool isLoading = true;
  late DateTime _selectedDateAppBBar;

  @override
  void initState() {
    super.initState();
    _selectedDateAppBBar = DateTime.now();
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
        scrolledUnderElevation: double.maxFinite,
        elevation: 0,
        backgroundColor: Colors.amber,
        title: Text('TripSchedule'),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Center(
            //   child: isLoading
            //       ? CircularProgressIndicator() // Show a loading indicator while fetching data
            //       : Text(
            //           'Welcome, $username',
            //           style: TextStyle(fontSize: 24),
            //         ),
            // ),
            Container(
              padding: const EdgeInsets.only(bottom: 12),
              decoration: const BoxDecoration(
                color: Colors.amber,
                borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(20),
                    bottomRight: Radius.circular(20)),
              ),
              child: CalendarAgenda(
                controller: _calendarAgendaControllerAppBar,
                appbar: false,
                selectedDayPosition: SelectedDayPosition.center,
                backgroundColor: Colors.amber.shade200,
                weekDay: WeekDay.short,
                fullCalendarScroll: FullCalendarScroll.horizontal,
                fullCalendarDay: WeekDay.short,
                selectedDateColor: Colors.white,
                headerDateColor: Colors.black,
                notSelectedDayBgColor: Colors.grey.withOpacity(0.3),
                dateColor: Colors.black,
                locale: 'en',
                initialDate: DateTime.now(),
                calendarEventColor: Colors.orange,
                firstDate: DateTime.now().subtract(Duration(days: 140)),
                lastDate: DateTime.now().add(Duration(days: 60)),
                onDateSelected: (date) {
                  setState(() {
                    _selectedDateAppBBar = date;
                  });
                },
                selectedDayLogo: Container(
                  width: double.maxFinite,
                  height: double.maxFinite,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.orange, Colors.red],
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            ),
            Center(
              child: Column(
                children: [
                  ElevatedButton(
                    onPressed: () {
                      _calendarAgendaControllerAppBar.goToDay(DateTime.now());
                    },
                    child: Text("Today, appbar = true"),
                  ),
                  Text('Selected date is $_selectedDateAppBBar'),
                  const SizedBox(
                    height: 20.0,
                  ),
                ],
              ),
            ),
            Container(
              margin: const EdgeInsets.all(8),
              color: Colors.amber,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Container(
                          color: Colors.black38,
                          child: const Text(
                            "Start Destination ",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 15,
                            ),
                          ),
                        ),
                        Container(
                          color: Colors.black38,
                          child: const Text(
                            ": Galle at 10:24",
                            style: TextStyle(
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
                        Container(
                          color: Colors.black38,
                          child: const Text(
                            "End Destination ",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 15,
                            ),
                          ),
                        ),
                        Container(
                          color: Colors.black38,
                          child: const Text(
                            ": Badulla at 17:45",
                            style: TextStyle(
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
                          color: Colors.black38,
                          child: const Text(
                            "Conducter ID : 3456897ID",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 15,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
