import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class TripTile extends StatelessWidget {
  final String startdesti, enddesti, starttime, endtime, conductorname;
  const TripTile({
    super.key,
    required this.conductorname,
    required this.enddesti,
    required this.endtime,
    required this.startdesti,
    required this.starttime,
  });

  @override
  Widget build(BuildContext context) {
    DateTime parsedStartTime = DateFormat("HH:mm:ss").parse(starttime);
    DateTime parsedEndTime = DateFormat("HH:mm:ss").parse(endtime);

    String formattedStartTime = DateFormat("HH:mm").format(parsedStartTime);
    String formattedEndTime = DateFormat("HH:mm").format(parsedEndTime);

    return Column(
      children: [
        Container(
          padding: const EdgeInsets.fromLTRB(8, 0, 8, 8),
          child: Material(
            color: Colors.yellow.shade300,
            shadowColor: Colors.black,
            elevation: 6.0,
            borderRadius: BorderRadius.circular(16),
            child: Container(
              padding: const EdgeInsets.all(8),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Row(
                          children: [
                            Icon(
                              Icons.location_on_sharp,
                              color: Colors.red,
                            ),
                            Text(
                              "Start Destination ",
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),
                          ],
                        ),
                        Text(
                          ":  ${startdesti.toUpperCase()} at $formattedStartTime",
                          style: const TextStyle(
                            fontSize: 15,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Row(
                          children: [
                            Icon(
                              Icons.location_off_sharp,
                              color: Colors.red,
                            ),
                            Text(
                              "End Destination ",
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),
                          ],
                        ),
                        Text(
                          ":  ${enddesti.toUpperCase()} at $formattedEndTime",
                          style: const TextStyle(
                            fontSize: 15,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        const Row(
                          children: [
                            Icon(
                              Icons.man_rounded,
                              color: Colors.red,
                            ),
                            Text(
                              "Conductor Name ",
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),
                          ],
                        ),
                        Text(
                          ": $conductorname",
                          style: const TextStyle(
                            fontSize: 15,
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
    );
  }
}
