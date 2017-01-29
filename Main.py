from DAO import DAO
from ReportDataWriter import ReportDataWriter
from DatabaseConnection import DatabaseConnection

dao = DAO(DatabaseConnection('DESKTOP-75UCJQJ', 'DWProject'))
reportDataWriter = ReportDataWriter()

rentalsInStation = dao.getRentalsInStationsAsJson()
rentalsHoursInDays = dao.getRentalInHoursForIndividualDaysAsJson()
stationProfileTotalRentalsInHourPerspective = dao.getRentalsOfStationsInHoursPerspective()
stationProfileUniqueRentalsHourPerspective = dao.getRentalsOfUniqueUsersOfStationsInHoursPerspective()
usersProfile = dao.getUsersRentalsInHourPerspective()
usersProfileNormalized = dao.getUsersRentalsInHourPerspectiveNormalized()
trafficFlow = dao.getTrafficFlowBetweenStations()
stations = dao.getStations()

reportDataWriter.replace_template_variable('{RENTALS_DATA_VAR}', rentalsInStation)
reportDataWriter.replace_template_variable('{RENTALS_HOURS_VAR}', rentalsHoursInDays)
reportDataWriter.replace_template_variable('{RENTALS_STATION_TOTAL_VAR}', stationProfileTotalRentalsInHourPerspective)
reportDataWriter.replace_template_variable('{RENTALS_STATION_UNIQUE_VAR}', stationProfileUniqueRentalsHourPerspective)
reportDataWriter.replace_template_variable('{RENTALS_USERS}', usersProfile)
reportDataWriter.replace_template_variable('{RENTALS_USERS_NORMALIZED}', usersProfileNormalized)
reportDataWriter.replace_template_variable('{RENTALS_TRAFFIC_FLOW}', trafficFlow)
reportDataWriter.replace_template_variable('{STATIONS}', stations)

reportDataWriter.write()
