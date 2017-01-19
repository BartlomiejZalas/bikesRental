import json

from unidecode import unidecode

from DatabaseConnection import DatabaseConnection


class DAO:
    def __init__(self):
        self.connection = DatabaseConnection('DESKTOP-75UCJQJ', 'DWProject')

    def getRentalsInStationsAsJson(self):
        cursor = self.connection.get_connection().cursor()
        cursor.execute("select StartStationId, Name, count(*) Count from ClassifiedData.StationsTrips "
                       "left join ClassifiedData.Stations on StationId = StartStationId "
                       "group by StartStationId, Name order by StartStationId")
        rows = [x for x in cursor]
        cols = [x[0] for x in cursor.description]
        results = []
        for row in rows:
            result = {}
            for prop, val in zip(cols, row):
                if isinstance(val, str):
                    result[prop] = unidecode(str(val))
                else:
                    result[prop] = val
            results.append(result)
        return json.dumps(results)