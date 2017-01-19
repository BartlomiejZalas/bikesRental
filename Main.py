from DAO import DAO
from ReportWriter import ReportWriter

dao = DAO()
reportWriter = ReportWriter()

rentalsInStation = dao.getRentalsInStationsAsJson()
rentalsHoursInDays = dao.getRentalInHoursForIndividualDaysAsJson()
stationProfileTotalRentalsInHourPerspective = dao.getRentalsOfStationsInHoursPerspective()
stationProfileUniqueRentalsHourPerspective = dao.getRentalsOfUniqueUsersOfStationsInHoursPerspective()

reportWriter.replace_template_variable('{RENTALS_DATA_VAR}', rentalsInStation)
reportWriter.replace_template_variable('{RENTALS_HOURS_VAR}', rentalsHoursInDays)
reportWriter.replace_template_variable('{RENTALS_STATION_TOTAL_VAR}', stationProfileTotalRentalsInHourPerspective)
reportWriter.replace_template_variable('{RENTALS_STATION_UNIQUE_VAR}', stationProfileUniqueRentalsHourPerspective)

reportWriter.write()


