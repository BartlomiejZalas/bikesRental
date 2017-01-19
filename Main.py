from DAO import DAO
from ReportWriter import ReportWriter

dao = DAO()
reportWriter = ReportWriter()

result = dao.getRentalsInStationsAsJson()
print(result)
reportWriter.replace_template_variable('{RENTALS_DATA_VAR}', result)
reportWriter.write()


