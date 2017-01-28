--create schema
create schema ClassifiedData;

--create metadata table
SELECT  
	TripId,
	YEAR(StartDate) StartYear,
	MONTH(StartDate) StartMonth,
	DAY(StartDate) StartDay,
	DATEPART(hh,StartDate) StartHour,
	DATEPART(mi,StartDate) StartMinute,
	Distance,
	ECC,
	AvgSpeed,
	TrackType,
	Sex UserSex,
	Year UserYear,
	Profession UserProfession,
	Zip UserZip,
	Source,
	TypeOfBike,
	TypeOfTrip
into ClassifiedData.TripMetadata 
FROM [Metadata]

-- add primary key
alter table ClassifiedData.TripMetadata add constraint PK_TripMetadata primary key (TripId)

-- remove short trips without track points
delete from ClassifiedData.TripMetadata where (select count(*) from Trip where ClassifiedData.TripMetadata.TripId = TripId) = 0

-- add spatial field to Trip Column
update Trip set Geo = geography::STPointFromText('POINT(' + CAST(Lat AS VARCHAR(20)) + ' ' + CAST(Long AS VARCHAR(20)) + ')', 4326)

--create trip track points table
SELECT TripId,
		YEAR(Date) Year,
		MONTH(Date) Month,
		DAY(Date) Day,
		DATEPART(hh,Date) Hour,
		DATEPART(mi,Date) Minute,
		DATEPART(ss,Date) Seconds,
		Geo Location,
		Altitude,
		Distance,
		Speed,
		Type
into  ClassifiedData.TripTrackPoints
FROM Trip

-- remove trip points without metadata
delete from ClassifiedData.TripTrackPoints where (select count(*) from Metadata m where m.TripId = ClassifiedData.TripTrackPoints.TripId) = 0

--add foreign key to metadata
ALTER TABLE ClassifiedData.TripTrackPoints ADD FOREIGN KEY (TripId) REFERENCES ClassifiedData.TripMetadata(TripId)

--create table with station trips for May 2016
SELECT [Uid]
      ,[BikeName]
	  ,[CustID]
	  ,(select top(1) Lp from Stations order by Location.STDistance(GeoStartPlaceId)) StartStationId
	  ,(select top(1) Lp from Stations order by Location.STDistance(GeoEndPlaceId)) EndStationId
	  , YEAR([StartTime]) StartYear,
		MONTH([StartTime]) StartMonth,
		DAY([StartTime]) StartDay,
		DATEPART(hh,[StartTime]) StartHour,
		DATEPART(mi,[StartTime]) StartMinute,
		YEAR([EndTime]) EndYear,
		MONTH([EndTime]) EndMonth,
		DAY([EndTime]) EndDay,
		DATEPART(hh,[EndTime]) EndHour,
		DATEPART(mi,[EndTime]) EndMinute
  into ClassifiedData.StationsTrips
  FROM [May2016] 

  -- do the same for June 2016
  insert into ClassifiedData.StationsTrips
  SELECT [Uid]
      ,[BikeName]
	  ,[CustID]
	  ,(select top(1) Lp from Stations order by Location.STDistance(GeoStartPlaceId)) StartStationId
	  ,(select top(1) Lp from Stations order by Location.STDistance(GeoEndPlaceId)) EndStationId
	  , YEAR([StartTime]) StartYear,
		MONTH([StartTime]) StartMonth,
		DAY([StartTime]) StartDay,
		DATEPART(hh,[StartTime]) StartHour,
		DATEPART(mi,[StartTime]) StartMinute,
		YEAR([EndTime]) EndYear,
		MONTH([EndTime]) EndMonth,
		DAY([EndTime]) EndDay,
		DATEPART(hh,[EndTime]) EndHour,
		DATEPART(mi,[EndTime]) EndMinute
   FROM [June2016] 

   -- do the same for July 2016
  insert into ClassifiedData.StationsTrips
  SELECT [Uid]
      ,[BikeName]
	  ,[CustID]
	  ,(select top(1) Lp from Stations order by Location.STDistance(GeoStartPlaceId)) StartStationId
	  ,(select top(1) Lp from Stations order by Location.STDistance(GeoEndPlaceId)) EndStationId
	  , YEAR([StartTime]) StartYear,
		MONTH([StartTime]) StartMonth,
		DAY([StartTime]) StartDay,
		DATEPART(hh,[StartTime]) StartHour,
		DATEPART(mi,[StartTime]) StartMinute,
		YEAR([EndTime]) EndYear,
		MONTH([EndTime]) EndMonth,
		DAY([EndTime]) EndDay,
		DATEPART(hh,[EndTime]) EndHour,
		DATEPART(mi,[EndTime]) EndMinute
   FROM [July2016] 

-- nothing special for Stations table
SELECT [Lp] StationId
      ,[Name]
      ,[Location]
	  into ClassifiedData.Stations
  FROM [DwProject].[dbo].[Stations]

-- add primary key to stations and stations trips
alter table ClassifiedData.Stations add constraint PK_Stations primary key (StationId)
alter table ClassifiedData.StationsTrips add constraint PK_StationsTrips primary key (Uid)

--add foreign key to stations trips
ALTER TABLE ClassifiedData.StationsTrips ADD FOREIGN KEY (StartStationId) REFERENCES ClassifiedData.Stations(StationId)
ALTER TABLE ClassifiedData.StationsTrips ADD FOREIGN KEY (EndStationId) REFERENCES ClassifiedData.Stations(StationId)
