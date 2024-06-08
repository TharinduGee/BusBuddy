class DriverModel {
  String? startDestination;
  String? endDestination;
  String? starttime;
  String? endtime;
  String? conductorName;
  String? tripStatus;
  String? numberPlate;
  int? tripId;

  DriverModel({
    this.conductorName,
    this.endDestination,
    this.endtime,
    this.startDestination,
    this.starttime,
    this.tripStatus,
    this.numberPlate,
    this.tripId,
  });
}
