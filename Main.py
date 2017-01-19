from DAO import DAO
from ReportWriter import ReportWriter

dao = DAO()
reportWriter = ReportWriter()

rentalsInStation = dao.getRentalsInStationsAsJson()
rentalsHoursInDays = dao.getRentalInHoursForIndividualDaysAsJson()
stationProfileTotalRentalsInHourPerspective = dao.getRentalsOfStationsInHoursPerspective()
stationProfileUniqueRentalsHourPerspective = dao.getRentalsOfUniqueUsersOfStationsInHoursPerspective()
usersProfile = dao.getUsersRentalsInHourPerspective()
usersProfileNormalized = dao.getUsersRentalsInHourPerspectiveNormalized()

reportWriter.replace_template_variable('{RENTALS_DATA_VAR}', rentalsInStation)
reportWriter.replace_template_variable('{RENTALS_HOURS_VAR}', rentalsHoursInDays)
reportWriter.replace_template_variable('{RENTALS_STATION_TOTAL_VAR}', stationProfileTotalRentalsInHourPerspective)
reportWriter.replace_template_variable('{RENTALS_STATION_UNIQUE_VAR}', stationProfileUniqueRentalsHourPerspective)
reportWriter.replace_template_variable('{RENTALS_USERS}', usersProfile)
reportWriter.replace_template_variable('{RENTALS_USERS_NORMALIZED}', usersProfileNormalized)

reportWriter.write()


