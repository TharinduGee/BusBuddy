import 'dart:convert';
import 'package:busbuddy/Screens/Dashboard/components/trip_tile.dart';
import 'package:busbuddy/responsive.dart';
import 'package:calendar_agenda/calendar_agenda.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:busbuddy/constants.dart';
import 'package:busbuddy/models/driver_model.dart';
import 'package:busbuddy/services/trips.dart';

class TripSchedule extends StatefulWidget {
  const TripSchedule({Key? key}) : super(key: key);

  @override
  _TripScheduleState createState() => _TripScheduleState();
}

class _TripScheduleState extends State<TripSchedule> {
  CalendarAgendaController _calendarAgendaControllerAppBar =
      CalendarAgendaController();
  // final storage = const FlutterSecureStorage();
  // late String token;
  // late String username = ''; // Initialize username with an empty string
  bool isLoading = true;
  late DateTime _selectedDateAppBBar;
  List<DriverModel> driverTrips = [];

  @override
  void initState() {
    super.initState();
    _selectedDateAppBBar = DateTime.now();
    getTrips();
    // _getTokenAndFetchUsername();
  }

  // Future<void> _getTokenAndFetchUsername() async {
  //   try {
  //     token = await storage.read(key: 'JWtoken') ?? "";
  //     final response = await http.get(
  //       Uri.parse('http://$khost:8081/api/v1/user/getUsername'),
  //       headers: {'Authorization': 'Bearer $token'},
  //     );
  //     if (response.statusCode == 200) {
  //       setState(() {
  //         username = response.body;
  //         isLoading = false;
  //       });
  //       getTrips();
  //     } else {
  //       throw Exception('Failed to load username');
  //     }
  //   } on http.ClientException catch (e) {
  //     print('Error fetching username: $e');
  //     setState(() {
  //       isLoading = false;
  //     });
  //     // Handle the exception accordingly, e.g., show a snackbar with an error message
  //   } catch (error) {
  //     print('Other error fetching username: $error');
  //     setState(() {
  //       isLoading = false;
  //     });
  //     // Handle other exceptions accordingly
  //   }
  // }

  void getTrips() async {
    Trips tripclass = Trips();
    await tripclass.getTrips(_selectedDateAppBBar);
    setState(() {
      driverTrips = tripclass.trips;
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "BUSBUDDY",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.amber,
      ),
      body: Responsive(
        tablet: TabletTripSchedule(),
        mobile: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
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
                firstDate: DateTime.now().subtract(const Duration(days: 140)),
                lastDate: DateTime.now().add(const Duration(days: 60)),
                onDateSelected: (date) {
                  setState(() {
                    _selectedDateAppBBar = date;
                  });
                  getTrips();
                },
                selectedDayLogo: Container(
                  width: double.maxFinite,
                  height: double.maxFinite,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Colors.orange, Colors.red],
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  SizedBox(
                    width: 150,
                    child: ElevatedButton(
                      onPressed: () {
                        _calendarAgendaControllerAppBar.goToDay(DateTime.now());
                      },
                      child: Text("Today".toUpperCase()),
                    ),
                  ),
                  SizedBox(
                    width: 150,
                    child: ElevatedButton(
                      onPressed: () {
                        _calendarAgendaControllerAppBar.goToDay(
                            DateTime.now().add(const Duration(days: 1)));
                      },
                      child: Text("tomorrow".toUpperCase()),
                    ),
                  ),
                  // Text('Selected date is $_selectedDateAppBBar'),
                  // const SizedBox(
                  //   height: 20.0,
                  // ),
                ],
              ),
            ),
            Expanded(
              flex: 1,
              child: isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : ListView.builder(
                      itemCount: driverTrips.length,
                      itemBuilder: (context, index) {
                        final trip = driverTrips[index];
                        return TripTile(
                          startdesti: trip.startDestination ?? 'Unknown',
                          enddesti: trip.endDestination ?? 'Unknown',
                          starttime: trip.starttime ?? 'Unknown',
                          endtime: trip.endtime ?? 'Unknown',
                          conductorname: trip.conductorName ?? 'Unknown',
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class TabletTripSchedule extends StatefulWidget {
  TabletTripSchedule({super.key});

  @override
  State<TabletTripSchedule> createState() => _TabletTripScheduleState();
}

class _TabletTripScheduleState extends State<TabletTripSchedule> {
  @override
  void initState() {
    super.initState();
    _selectedDateAppBBar = DateTime.now();
    getTrips();
    // _getTokenAndFetchUsername();
  }

  void getTrips() async {
    Trips tripclass = Trips();
    await tripclass.getTrips(_selectedDateAppBBar);
    setState(() {
      driverTrips = tripclass.trips;
      isLoading = false;
    });
  }

  CalendarAgendaController _calendarAgendaControllerAppBar =
      CalendarAgendaController();

  // final storage = const FlutterSecureStorage();
  bool isLoading = true;

  late DateTime _selectedDateAppBBar;

  List<DriverModel> driverTrips = [];

  // Future<void> _getTokenAndFetchUsername() async {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.only(bottom: 12),
          decoration: const BoxDecoration(
            color: Colors.transparent,
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
            firstDate: DateTime.now().subtract(const Duration(days: 140)),
            lastDate: DateTime.now().add(const Duration(days: 60)),
            onDateSelected: (date) {
              setState(() {
                _selectedDateAppBBar = date;
              });
              getTrips();
            },
            selectedDayLogo: Container(
              width: double.maxFinite,
              height: double.maxFinite,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Colors.orange, Colors.red],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
                borderRadius: BorderRadius.circular(10.0),
              ),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(10.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              SizedBox(
                width: 150,
                child: ElevatedButton(
                  onPressed: () {
                    _calendarAgendaControllerAppBar.goToDay(DateTime.now());
                  },
                  child: Text("Today".toUpperCase()),
                ),
              ),
              SizedBox(
                width: 150,
                child: ElevatedButton(
                  onPressed: () {
                    _calendarAgendaControllerAppBar
                        .goToDay(DateTime.now().add(const Duration(days: 1)));
                  },
                  child: Text("tomorrow".toUpperCase()),
                ),
              ),
              // Text('Selected date is $_selectedDateAppBBar'),
              // const SizedBox(
              //   height: 20.0,
              // ),
            ],
          ),
        ),
        Expanded(
          flex: 1,
          child: isLoading
              ? const Center(child: CircularProgressIndicator())
              : ListView.builder(
                  itemCount: driverTrips.length,
                  itemBuilder: (context, index) {
                    final trip = driverTrips[index];
                    return TripTile(
                      startdesti: trip.startDestination ?? 'Unknown',
                      enddesti: trip.endDestination ?? 'Unknown',
                      starttime: trip.starttime ?? 'Unknown',
                      endtime: trip.endtime ?? 'Unknown',
                      conductorname: trip.conductorName ?? 'Unknown',
                    );
                  },
                ),
        ),
      ],
    );
  }
}
