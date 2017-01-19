import json

from unidecode import unidecode

from DatabaseConnection import DatabaseConnection


class DAO:
    def __init__(self):
        self.connection = DatabaseConnection('DESKTOP-75UCJQJ', 'DWProject')

    def getRentalsInStationsAsJson(self):
        query = "select StartStationId, Name, count(*) Count from ClassifiedData.StationsTrips " \
                       "left join ClassifiedData.Stations on StationId = StartStationId " \
                       "group by StartStationId, Name order by StartStationId"
        return self.get_json_for_query(query)

    def getRentalInHoursForIndividualDaysAsJson(self):
        query = "select count(*) Rentals, " \
                "'2016-'+ RIGHT('0'+ CAST(StartMonth as varchar), 2) + '-' + RIGHT('0'+ CAST(StartDay as varchar), 2) + ' ' + RIGHT('0'+ CAST(StartHour as varchar), 2) + ':00' [Date] " \
                "from ClassifiedData.StationsTrips group by StartHour, StartDay, StartMonth order by StartMonth, StartDay, StartHour"
        return self.get_json_for_query(query)

    def getRentalsOfStationsInHoursPerspective(self):
        query = "select Name, StartHour, count(*) Rentals from ClassifiedData.StationsTrips " \
                "left join ClassifiedData.Stations on StationId = StartStationId group by StartStationId, Name, StartHour order by Name, StartHour"
        return self.get_json_for_query(query)

    def getRentalsOfUniqueUsersOfStationsInHoursPerspective(self):
        query = "select Name, StartHour, count(distinct CustID) Rentals from ClassifiedData.StationsTrips " \
                "left join ClassifiedData.Stations on StationId = StartStationId group by StartStationId, Name, StartHour order by Name, StartHour"
        return self.get_json_for_query(query)

    def getUsersRentalsInHourPerspective(self):
        query = "select StartHour, count(*) Rentals from ClassifiedData.StationsTrips group by StartHour"
        return self.get_json_for_query(query)

    def getUsersRentalsInHourPerspectiveNormalized(self):
        query = "select StartHour, count(*) * 100 / (select count(*) from ClassifiedData.StationsTrips)[Percentage] from ClassifiedData.StationsTrips group by StartHour"
        return self.get_json_for_query(query)

    def get_json_for_query(self, query):
        cursor = self.connection.get_connection().cursor()
        cursor.execute(query)
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
