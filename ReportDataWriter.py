class ReportDataWriter:
    templatePath = 'resources/data_template.js'
    targetPath = 'target/data.js'

    def __init__(self):
        file = open(self.templatePath, 'r')
        self.template_string = file.read()

    def replace_template_variable(self, variable, string):
        self.template_string = self.template_string.replace(variable, string)

    def write(self):
        text_file = open(self.targetPath, "w")
        text_file.write(self.template_string)
        text_file.close()



