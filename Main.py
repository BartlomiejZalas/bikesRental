from DAO import DAO
from ReportWriter import ReportWriter

dao = DAO()
reportWriter = ReportWriter()

rentalsInStation = dao.getRentalsInStationsAsJson()
rentalsHoursInDays = dao.getRentalInHoursForIndividualDaysAsJson()

reportWriter.replace_template_variable('{RENTALS_DATA_VAR}', rentalsInStation)
reportWriter.replace_template_variable('{RENTALS_HOURS_VAR}', rentalsHoursInDays)

reportWriter.write()


