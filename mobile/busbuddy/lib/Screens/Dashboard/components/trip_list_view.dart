import 'package:busbuddy/Screens/Dashboard/components/trip_tile.dart';
import 'package:busbuddy/models/driver_model.dart';
import 'package:flutter/material.dart';

class TripListView extends StatelessWidget {
  final bool isLoading;
  List<DriverModel> driverTrips = [];

  TripListView({required this.isLoading, required this.driverTrips});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 1,
      child: isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: driverTrips.length,
              itemBuilder: (context, index) {
                final trip = driverTrips[index];
                return GestureDetector(
                  onTap: () {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: Text('Trip Details'),
                          content: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                  'Start Destination: ${trip.startDestination ?? 'Unknown'}'),
                              Text(
                                  'End Destination: ${trip.endDestination ?? 'Unknown'}'),
                              Text(
                                  'Start Time: ${trip.starttime ?? 'Unknown'}'),
                              Text('End Time: ${trip.endtime ?? 'Unknown'}'),
                              Text(
                                  'Conductor Name: ${trip.conductorName ?? 'Unknown'}'),
                            ],
                          ),
                          actions: [
                            TextButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                              child: Text('Close'),
                            ),
                          ],
                        );
                      },
                    );
                  },
                  child: TripTile(
                    startdesti: trip.startDestination ?? 'Unknown',
                    enddesti: trip.endDestination ?? 'Unknown',
                    starttime: trip.starttime ?? 'Unknown',
                    endtime: trip.endtime ?? 'Unknown',
                    conductorname: trip.conductorName ?? 'Unknown',
                    tripId: trip.tripId ?? -1,
                  ),
                );
              },
            ),
    );
  }
}
