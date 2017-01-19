import pyodbc


class DatabaseConnection:
    def __init__(self, server, database):
        conn_str = (
            r'Driver={SQL Server};'
            r'Server=' + server + ';'
            r'Database=' + database + ';'
            r'Trusted_Connection=yes;'
        )
        self.connection = pyodbc.connect(conn_str)

    def get_connection(self):
        return self.connection
