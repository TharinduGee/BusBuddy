import 'package:busbuddy/Screens/Dashboard/components/trip_tile.dart';
import 'package:busbuddy/models/driver_model.dart';
import 'package:flutter/material.dart';
import 'package:busbuddy/services/ledger_service.dart';

class TripListView extends StatelessWidget {
  final bool isLoading;
  List<DriverModel> driverTrips = [];

  TripListView({super.key, required this.isLoading, required this.driverTrips});

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
                          title: const Text('Trip Details'),
                          content: SingleChildScrollView(
                            child: Column(
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
                                    'Conductor Name: ${trip.conductorName ?? 'Unassigned'}'),
                              ],
                            ),
                          ),
                          actions: [
                            TextButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                              child: const Text('Close'),
                            ),
                            TextButton(
                              onPressed: () {
                                _showAddEntryDialog(context, trip.tripId!);
                              },
                              child: const Text('Add Entry'),
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
                    conductorname: trip.conductorName ?? 'Unassigned',
                    tripId: trip.tripId ?? -1,
                  ),
                );
              },
            ),
    );
  }

  void _showAddEntryDialog(BuildContext context, int tripId) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AddEntryDialog(tripId: tripId);
      },
    );
  }
}

class AddEntryDialog extends StatefulWidget {
  final int tripId;

  const AddEntryDialog({required this.tripId});

  @override
  _AddEntryDialogState createState() => _AddEntryDialogState();
}

class _AddEntryDialogState extends State<AddEntryDialog> {
  final TextEditingController _amountController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  String? _selectedType;

  final Map<String, String> transactionTypes = {
    'Income': 'TRANSACTION_TYPE_TICKET_INCOME',
    'Expense': 'TRANSACTION_TYPE_TICKET_EXPENSE',
  };

  @override
  Widget build(BuildContext context) {
    final isLandscape =
        MediaQuery.of(context).orientation == Orientation.landscape;

    return AlertDialog(
      title: isLandscape ? null : const Text('Add Entry'),
      content: SingleChildScrollView(
        child: isLandscape ? _buildLandscapeContent() : _buildPortraitContent(),
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text('Cancel'),
        ),
        TextButton(
          onPressed: () async {
            if (_selectedType != null &&
                _nameController.text.isNotEmpty &&
                _amountController.text.isNotEmpty) {
              await LedgerService.addEntry(
                type: _selectedType!,
                name: _nameController.text,
                amount: int.parse(_amountController.text),
                refId: widget.tripId,
              );
              Navigator.of(context).pop();
            }
          },
          child: const Text('Add'),
        ),
      ],
    );
  }

  Widget _buildLandscapeContent() {
    return Row(
      children: [
        Expanded(
          child: DropdownButton<String>(
            hint: const Text('Select Type'),
            value: _selectedType != null
                ? transactionTypes.entries
                    .firstWhere((entry) => entry.value == _selectedType)
                    .key
                : null,
            onChanged: (String? newValue) {
              setState(() {
                _selectedType = transactionTypes[newValue]!;
              });
            },
            items: transactionTypes.keys
                .map<DropdownMenuItem<String>>((String key) {
              return DropdownMenuItem<String>(
                value: key,
                child: Text(key),
              );
            }).toList(),
          ),
        ),
        if (_selectedType != null) ...[
          Expanded(
            child: Padding(
              padding: EdgeInsets.zero,
              child: TextField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Description'),
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: EdgeInsets.zero,
              child: TextField(
                controller: _amountController,
                decoration: const InputDecoration(labelText: 'Amount LKR'),
                keyboardType: TextInputType.number,
              ),
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildPortraitContent() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        DropdownButton<String>(
          hint: const Text('Select Type'),
          value: _selectedType != null
              ? transactionTypes.entries
                  .firstWhere((entry) => entry.value == _selectedType)
                  .key
              : null,
          onChanged: (String? newValue) {
            setState(() {
              _selectedType = transactionTypes[newValue]!;
            });
          },
          items:
              transactionTypes.keys.map<DropdownMenuItem<String>>((String key) {
            return DropdownMenuItem<String>(
              value: key,
              child: Text(key),
            );
          }).toList(),
        ),
        if (_selectedType != null) ...[
          TextField(
            controller: _nameController,
            decoration: const InputDecoration(labelText: 'Description'),
          ),
          TextField(
            controller: _amountController,
            decoration: const InputDecoration(labelText: 'Amount LKR'),
            keyboardType: TextInputType.number,
          ),
        ],
      ],
    );
  }
}
