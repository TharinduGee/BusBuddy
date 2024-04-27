import 'calendarhorizontal.dart';

// CalendarController
class CalendarAgendaHorizontalController {
  CalendarAgendaHorizontalState? state;

  void bindState(CalendarAgendaHorizontalState state) {
    this.state = state;
  }

  void goToDay(DateTime date) {
    state!.getDate(date);
  }

  void dispose() {
    state = null;
  }
}
